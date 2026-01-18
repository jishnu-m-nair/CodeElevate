import { env } from '../config/env.config.js';
import { redis } from '../config/redis.config.js';
// import StatusCode from '../enums/statusCode.js';
import { CustomError } from '../errors/CustomError.js';
import type { AuthRole } from '../interface/common/common.interface.js';
import type { IAdminRepository } from '../interface/repositories/adminRepo.interface.js';
import type { IRecruiterRepository } from '../interface/repositories/recruiterRepo.interface.js';
import type { IUserRepository } from '../interface/repositories/userRepo.interface.js';
import type {
  AdminData,
  AuthEntity,
  AuthPayload,
  ForgotPasswordResponse,
  IAuthService,
  LoginResponse,
  LogoutResponse,
  OtpVerificationResponse,
  RecruiterData,
  RefreshTokenResponse,
  ResendOtpResponse,
  ResetPasswordResponse,
  SignupRecruiterDTO,
  SignupResponse,
  SignupUserDTO,
  UserData,
} from '../interface/services/authService.interface.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/authTokens.js';
import { sendOtpMail } from '../utils/mailer.js';
import { generateOtp } from '../utils/otp.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateUsernameBase } from '../utils/username.js';

class AuthService implements IAuthService {
  constructor(
    private _userRepo: IUserRepository,
    private _recruiterRepo: IRecruiterRepository,
    private _adminRepo: IAdminRepository,
  ) {}

  private async loginEntity<T extends AuthEntity, P extends AuthPayload>(
    entity: T | null,
    password: string,
    role: AuthRole,
    accessCheck: (entity: T) => void,
    buildPayload: (entity: T) => P,
  ): Promise<LoginResponse> {
    if (!entity) {
      throw new CustomError('Invalid email or password', 401);
    }

    accessCheck(entity);

    if (role !== 'admin') {
      if (!entity.providers?.includes('local')) {
        throw new CustomError('Invalid email or password', 401);
      }

      const valid = await comparePassword(password, entity.password!);
      if (!valid) {
        throw new CustomError('Invalid email or password', 401);
      }
    }

    const userData: P = buildPayload(entity);
    const tokens = await this.generateTokens(userData.id, role);

    return {
      success: true,
      message: 'Login successful',
      data: { ...tokens, user: userData },
    };
  }

  async loginUser(email: string, password: string): Promise<LoginResponse> {
    const user = await this._userRepo.findByEmail(email);
    if (!user) throw new CustomError('Invalid email or password', 401);

    return this.loginEntity<typeof user, UserData>(
      user,
      password,
      'user',
      (u) => {
        this.validateAccountAccess({ isBlocked: u.isBlocked });
        if (!u.isVerified) throw new CustomError('Access denied', 403);
      },
      (u): UserData => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: 'user',
        isVerified: u.isVerified,
      }),
    );
  }

  async loginRecruiter(email: string, password: string): Promise<LoginResponse> {
    const recruiter = await this._recruiterRepo.findByEmail(email);
    if (!recruiter) throw new CustomError('Invalid email or password', 401);

    return this.loginEntity<typeof recruiter, RecruiterData>(
      recruiter,
      password,
      'recruiter',
      (r) => {
        this.validateAccountAccess({ isBlocked: r.isBlocked });
        if (!r.isVerified) throw new CustomError('Access denied', 403);
      },
      (r): RecruiterData => ({
        id: r.id,
        email: r.email,
        companyName: r.companyName,
        role: 'recruiter',
        isVerified: r.isVerified,
      }),
    );
  }

  async loginAdmin(email: string, password: string): Promise<LoginResponse> {
    const admin = await this._adminRepo.findByEmail(email);
    if (!admin) throw new CustomError('Invalid email or password', 401);

    return this.loginEntity<typeof admin, AdminData>(
      admin,
      password,
      'admin',
      async (a) => {
        this.validateAccountAccess({ isActive: a.isActive });

        const valid = await comparePassword(password, a.password);
        if (!valid) {
          throw new CustomError('Invalid email or password', 401);
        }
      },
      (a): AdminData => ({
        id: a.id,
        email: a.email,
        role: 'admin',
      }),
    );
  }

  async signupUser(data: SignupUserDTO): Promise<SignupResponse> {
    const exists = await this._userRepo.findByEmail(data.email);
    if (exists) throw new CustomError('Email already registered', 409);

    const password = await hashPassword(data.password);

    const username = await this.generateUniqueUsername(data.name, data.email);

    const user = await this._userRepo.create({
      ...data,
      username,
      providers: ['local'],
      password,
      isVerified: false,
    });

    await this.generateAndSendOtp(user.email, 'user');

    return {
      success: true,
      message: 'Signup successful. Please verify your email.',
      data: { userId: user.id, email: user.email },
    };
  }

  async signupRecruiter(data: SignupRecruiterDTO): Promise<SignupResponse> {
    const exists = await this._recruiterRepo.findByEmail(data.email);
    if (exists) throw new CustomError('Email already registered', 409);

    const password = await hashPassword(data.password);

    const recruiter = await this._recruiterRepo.create({
      ...data,
      password,
      providers: ['local'],
      isVerified: false,
    });

    await this.generateAndSendOtp(recruiter.email, 'recruiter');

    return {
      success: true,
      message: 'Signup successful. Please verify your email.',
      data: { userId: recruiter.id, email: recruiter.email },
    };
  }

  private async verifyOtp(email: string, role: 'user' | 'recruiter', otp: string): Promise<void> {
    const key = `otp:verify:${role}:${email}`;
    const data = await redis.get(key);

    if (!data) {
      throw new CustomError('Invalid or expired OTP', 400);
    }

    const { otp: storedOtp } = JSON.parse(data);
    if (storedOtp !== otp) {
      throw new CustomError('Invalid or expired OTP', 400);
    }

    await redis.del(key);
  }

  async verifyUserOtp(email: string, otp: string): Promise<OtpVerificationResponse> {
    await this.verifyOtp(email, 'user', otp);

    const user = await this._userRepo.findByEmail(email);
    if (!user) throw new CustomError('User not found', 404);

    await this._userRepo.verifyEmail(email);

    const tokens = await this.generateTokens(user.id, 'user');

    return {
      success: true,
      message: 'Email verified successfully',
      data: {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'user',
          isVerified: true,
        },
      },
    };
  }

  async verifyRecruiterOtp(email: string, otp: string): Promise<OtpVerificationResponse> {
    await this.verifyOtp(email, 'recruiter', otp);

    const recruiter = await this._recruiterRepo.findByEmail(email);
    if (!recruiter) throw new CustomError('Recruiter not found', 404);

    await this._recruiterRepo.verifyEmail(email);

    const tokens = await this.generateTokens(recruiter.id, 'recruiter');

    return {
      success: true,
      message: 'Email verified successfully',
      data: {
        ...tokens,
        user: {
          id: recruiter.id,
          email: recruiter.email,
          companyName: recruiter.companyName,
          role: 'recruiter',
          isVerified: true,
        },
      },
    };
  }

  async resendUserOtp(email: string): Promise<ResendOtpResponse> {
    const user = await this._userRepo.findByEmail(email);
    if (!user) throw new CustomError('User not found', 404);
    if (user.isVerified) throw new CustomError('Email already verified', 400);

    await this.generateAndSendOtp(email, 'user');

    return {
      success: true,
      message: 'OTP resent successfully',
    };
  }

  async resendRecruiterOtp(email: string): Promise<ResendOtpResponse> {
    const recruiter = await this._recruiterRepo.findByEmail(email);
    if (!recruiter) throw new CustomError('Recruiter not found', 404);
    if (recruiter.isVerified) throw new CustomError('Email already verified', 400);

    await this.generateAndSendOtp(email, 'recruiter');

    return {
      success: true,
      message: 'OTP resent successfully',
    };
  }

  async forgotPasswordUser(email: string): Promise<ForgotPasswordResponse> {
    const user = await this._userRepo.findByEmail(email);

    const response = {
      success: true,
      message: 'If an account exists, a reset link has been sent.',
    };

    if (!user) return response;

    if (!user.providers?.includes('local')) {
      return response;
    }

    const token = crypto.randomUUID();
    const key = `password:reset:user:${token}`;

    await redis.set(key, user.id, 'EX', env.FORGOT_PASSWORD_TTL_SECONDS);
    await sendOtpMail(email, token);

    return response;
  }

  async forgotPasswordRecruiter(email: string): Promise<ForgotPasswordResponse> {
    const recruiter = await this._recruiterRepo.findByEmail(email);

    const response = {
      success: true,
      message: 'If an account exists, a reset link has been sent.',
    };
    if (!recruiter) return response;

    if (!recruiter.providers?.includes('local')) {
      return response;
    }

    const token = crypto.randomUUID();
    const key = `password:reset:recruiter:${token}`;

    await redis.set(key, recruiter.id, 'EX', env.FORGOT_PASSWORD_TTL_SECONDS);
    await sendOtpMail(email, token);

    return response;
  }

  async resetPasswordUser(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    const key = `password:reset:user:${token}`;
    const userId = await redis.get(key);

    if (!userId) throw new CustomError('Invalid or expired reset link', 400);

    const user = await this._userRepo.findById(userId);
    if (!user) throw new CustomError('Invalid or expired reset link', 400);

    if (!user.providers?.includes('local')) {
      throw new CustomError('Password reset not allowed for this account', 400);
    }

    const hashed = await hashPassword(newPassword);
    await this._userRepo.updatePassword(userId, hashed);

    await redis.del(key);

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }

  async resetPasswordRecruiter(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    const key = `password:reset:recruiter:${token}`;
    const recruiterId = await redis.get(key);

    if (!recruiterId) throw new CustomError('Invalid or expired reset link', 400);

    const recruiter = await this._recruiterRepo.findById(recruiterId);
    if (!recruiter) throw new CustomError('Invalid or expired reset link', 400);

    if (!recruiter.providers?.includes('local')) {
      throw new CustomError('Password reset not allowed for this account', 400);
    }

    const hashed = await hashPassword(newPassword);
    await this._recruiterRepo.updatePassword(recruiterId, hashed);

    await redis.del(key);

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }

  async logout(userId: string, refreshToken: string): Promise<LogoutResponse> {
    const key = `auth:logout:${refreshToken}`;

    await redis.set(key, userId, 'EX', env.REFRESH_TOKEN_TTL_SECONDS);

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const blacklisted = await redis.get(`auth:logout:${refreshToken}`);
    if (blacklisted) throw new CustomError('Session expired', 401);

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      sub: payload.sub,
      role: payload.role,
    });

    return {
      success: true,
      message: 'Token refreshed',
      data: { accessToken },
    };
  }

  private async generateAndSendOtp(email: string, role: 'user' | 'recruiter'): Promise<void> {
    const otp = generateOtp(6).toString();
    const key = `otp:verify:${role}:${email}`;

    await redis.set(key, JSON.stringify({ otp }), 'EX', env.OTP_TTL_SECONDS);
    console.log(otp);
    await sendOtpMail(email, otp);
  }

  private validateAccountAccess(options: { isBlocked?: boolean; isActive?: boolean }) {
    if (options.isBlocked === true || options.isActive === false) {
      throw new CustomError('Access denied', 403);
    }
  }

  private async generateTokens(
    id: string,
    role: AuthRole,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return {
      accessToken: generateAccessToken({ sub: id, role }),
      refreshToken: generateRefreshToken({ sub: id, role }),
    };
  }

  private async generateUniqueUsername(name: string, email: string): Promise<string> {
    const base = generateUsernameBase(name, email);
    let username = '';
    let exists = true;

    while (exists) {
      const suffix = Math.floor(100000 + Math.random() * 900000);
      username = `${base}_${suffix}`.toLowerCase().trim();

      exists = await this._userRepo.existsByUsername(username);
    }

    return username;
  }
}

export default AuthService;
