import { env } from '../config/env.config.js';
import { redis } from '../config/redis.config.js';
import { Users, type NonAdminRole } from '../enums/common.enums.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
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
import { sendOtpMail, sendResetPasswordMail } from '../utils/mailer.js';
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
      throw new CustomError(Messages.auth.error.invalidCredentials, StatusCode.UNAUTHORIZED);
    }

    accessCheck(entity);

    if (role !== Users.ADMIN) {
      if (!entity.providers?.includes('local')) {
        throw new CustomError(Messages.auth.error.invalidCredentials, StatusCode.UNAUTHORIZED);
      }

      const valid = await comparePassword(password, entity.password!);
      if (!valid) {
        throw new CustomError(Messages.auth.error.invalidCredentials, StatusCode.UNAUTHORIZED);
      }
    }

    const userData: P = buildPayload(entity);
    const tokens = await this.generateTokens(userData.id, role);

    return {
      success: true,
      message: Messages.auth.success.loginSuccess,
      data: { ...tokens, user: userData },
    };
  }

  async loginUser(email: string, password: string): Promise<LoginResponse> {
    const user = await this._userRepo.findByEmail(email);
    if (!user) {
      throw new CustomError(Messages.auth.error.invalidCredentials, StatusCode.UNAUTHORIZED);
    }

    return this.loginEntity<typeof user, UserData>(
      user,
      password,
      Users.USER,
      (u) => {
        this.validateAccountAccess({ isBlocked: u.isBlocked });
        if (!u.isVerified) {
          throw new CustomError(Messages.auth.error.accessDenied, StatusCode.FORBIDDEN);
        }
      },
      (u): UserData => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: Users.USER,
        isVerified: u.isVerified,
      }),
    );
  }

  async loginRecruiter(email: string, password: string): Promise<LoginResponse> {
    const recruiter = await this._recruiterRepo.findByEmail(email);
    if (!recruiter) {
      throw new CustomError(Messages.auth.error.invalidCredentials, StatusCode.UNAUTHORIZED);
    }

    return this.loginEntity<typeof recruiter, RecruiterData>(
      recruiter,
      password,
      Users.RECRUITER,
      (r) => {
        this.validateAccountAccess({ isBlocked: r.isBlocked });
        if (!r.isVerified) {
          throw new CustomError(Messages.auth.error.accessDenied, StatusCode.FORBIDDEN);
        }
      },
      (r): RecruiterData => ({
        id: r.id,
        email: r.email,
        companyName: r.companyName,
        role: Users.RECRUITER,
        isVerified: r.isVerified,
      }),
    );
  }

  async loginAdmin(email: string, password: string): Promise<LoginResponse> {
    const admin = await this._adminRepo.findByEmail(email);
    if (!admin) {
      throw new CustomError(Messages.auth.error.invalidCredentials, StatusCode.UNAUTHORIZED);
    }

    return this.loginEntity<typeof admin, AdminData>(
      admin,
      password,
      Users.ADMIN,
      async (a) => {
        this.validateAccountAccess({ isActive: a.isActive });

        const valid = await comparePassword(password, a.password);
        if (!valid) {
          throw new CustomError(Messages.auth.error.invalidCredentials, StatusCode.UNAUTHORIZED);
        }
      },
      (a): AdminData => ({
        id: a.id,
        email: a.email,
        role: Users.ADMIN,
      }),
    );
  }

  async signupUser(data: SignupUserDTO): Promise<SignupResponse> {
    const exists = await this._userRepo.findByEmail(data.email);
    if (exists) {
      throw new CustomError(Messages.auth.error.emailAlreadyRegistered, StatusCode.CONFLICT);
    }

    const password = await hashPassword(data.password);

    const username = await this.generateUniqueUsername(data.name, data.email);

    const user = await this._userRepo.create({
      ...data,
      username,
      providers: ['local'],
      password,
      isVerified: false,
    });

    await this.generateAndSendOtp(user.email, Users.USER);

    return {
      success: true,
      message: Messages.auth.success.signupSuccess,
      data: { userId: user.id, email: user.email },
    };
  }

  async signupRecruiter(data: SignupRecruiterDTO): Promise<SignupResponse> {
    const exists = await this._recruiterRepo.findByEmail(data.email);
    if (exists) {
      throw new CustomError(Messages.auth.error.emailAlreadyRegistered, StatusCode.CONFLICT);
    }

    const password = await hashPassword(data.password);

    const recruiter = await this._recruiterRepo.create({
      ...data,
      password,
      providers: ['local'],
      isVerified: false,
    });

    await this.generateAndSendOtp(recruiter.email, Users.RECRUITER);

    return {
      success: true,
      message: Messages.auth.success.signupSuccess,
      data: { userId: recruiter.id, email: recruiter.email },
    };
  }

  private async verifyOtp(email: string, role: NonAdminRole, otp: string): Promise<void> {
    const key = `otp:verify:${role}:${email}`;
    const data = await redis.get(key);

    if (!data) {
      throw new CustomError(Messages.auth.error.otpInvalid, StatusCode.BAD_REQUEST);
    }

    const { otp: storedOtp } = JSON.parse(data);
    if (storedOtp !== otp) {
      throw new CustomError(Messages.auth.error.otpInvalid, StatusCode.BAD_REQUEST);
    }

    await redis.del(key);
  }

  async verifyUserOtp(email: string, otp: string): Promise<OtpVerificationResponse> {
    await this.verifyOtp(email, Users.USER, otp);

    const user = await this._userRepo.findByEmail(email);
    if (!user) throw new CustomError(Messages.auth.error.userNotFound, StatusCode.NOT_FOUND);

    await this._userRepo.verifyEmail(email);

    const tokens = await this.generateTokens(user.id, Users.USER);

    return {
      success: true,
      message: Messages.auth.success.emailVerified,
      data: {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: Users.USER,
          isVerified: true,
        },
      },
    };
  }

  async verifyRecruiterOtp(email: string, otp: string): Promise<OtpVerificationResponse> {
    await this.verifyOtp(email, Users.RECRUITER, otp);

    const recruiter = await this._recruiterRepo.findByEmail(email);
    if (!recruiter) {
      throw new CustomError(Messages.auth.error.recruiterNotFound, StatusCode.NOT_FOUND);
    }

    await this._recruiterRepo.verifyEmail(email);

    const tokens = await this.generateTokens(recruiter.id, Users.RECRUITER);

    return {
      success: true,
      message: Messages.auth.success.emailVerified,
      data: {
        ...tokens,
        user: {
          id: recruiter.id,
          email: recruiter.email,
          companyName: recruiter.companyName,
          role: Users.RECRUITER,
          isVerified: true,
        },
      },
    };
  }

  async resendUserOtp(email: string): Promise<ResendOtpResponse> {
    const user = await this._userRepo.findByEmail(email);
    if (!user) throw new CustomError(Messages.auth.error.userNotFound, StatusCode.NOT_FOUND);
    if (user.isVerified) {
      throw new CustomError(Messages.auth.error.emailAlreadyVerified, StatusCode.BAD_REQUEST);
    }

    await this.generateAndSendOtp(email, Users.USER);

    return {
      success: true,
      message: Messages.auth.success.otpResent,
    };
  }

  async resendRecruiterOtp(email: string): Promise<ResendOtpResponse> {
    const recruiter = await this._recruiterRepo.findByEmail(email);
    if (!recruiter) {
      throw new CustomError(Messages.auth.error.recruiterNotFound, StatusCode.NOT_FOUND);
    }
    if (recruiter.isVerified) {
      throw new CustomError(Messages.auth.error.emailAlreadyVerified, StatusCode.BAD_REQUEST);
    }

    await this.generateAndSendOtp(email, Users.RECRUITER);

    return {
      success: true,
      message: Messages.auth.success.otpResent,
    };
  }

  async forgotPasswordUser(email: string): Promise<ForgotPasswordResponse> {
    const user = await this._userRepo.findByEmail(email);

    const response = {
      success: true,
      message: Messages.auth.success.resetLinkSent,
    };

    if (!user) return response;

    if (!user.providers?.includes('local')) {
      return response;
    }

    const token = crypto.randomUUID();
    const key = `password:reset:user:${token}`;

    await redis.set(key, user.id, 'EX', env.FORGOT_PASSWORD_TTL_SECONDS);
    await sendResetPasswordMail(email, token, Users.USER);

    return response;
  }

  async forgotPasswordRecruiter(email: string): Promise<ForgotPasswordResponse> {
    const recruiter = await this._recruiterRepo.findByEmail(email);

    const response = {
      success: true,
      message: Messages.auth.success.resetLinkSent,
    };
    if (!recruiter) return response;

    if (!recruiter.providers?.includes('local')) {
      return response;
    }

    const token = crypto.randomUUID();
    const key = `password:reset:recruiter:${token}`;

    await redis.set(key, recruiter.id, 'EX', env.FORGOT_PASSWORD_TTL_SECONDS);
    await sendResetPasswordMail(email, token, Users.RECRUITER);

    return response;
  }

  async resetPasswordUser(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    const key = `password:reset:user:${token}`;
    const userId = await redis.get(key);

    if (!userId) {
      throw new CustomError(Messages.auth.error.resetLinkInvalid, StatusCode.BAD_REQUEST);
    }

    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new CustomError(Messages.auth.error.resetLinkInvalid, StatusCode.BAD_REQUEST);
    }

    if (!user.providers?.includes('local')) {
      throw new CustomError(Messages.auth.error.passwordResetNotAllowed, StatusCode.BAD_REQUEST);
    }
    const hashed = await hashPassword(newPassword);
    await this._userRepo.updatePassword(userId, hashed);

    await redis.del(key);

    return {
      success: true,
      message: Messages.auth.success.passwordResetSuccess,
    };
  }

  async resetPasswordRecruiter(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    const key = `password:reset:recruiter:${token}`;
    const recruiterId = await redis.get(key);

    if (!recruiterId) {
      throw new CustomError(Messages.auth.error.resetLinkInvalid, StatusCode.BAD_REQUEST);
    }

    const recruiter = await this._recruiterRepo.findById(recruiterId);
    if (!recruiter) {
      throw new CustomError(Messages.auth.error.resetLinkInvalid, StatusCode.BAD_REQUEST);
    }

    if (!recruiter.providers?.includes('local')) {
      throw new CustomError(Messages.auth.error.passwordResetNotAllowed, StatusCode.BAD_REQUEST);
    }

    const hashed = await hashPassword(newPassword);
    await this._recruiterRepo.updatePassword(recruiterId, hashed);

    await redis.del(key);

    return {
      success: true,
      message: Messages.auth.success.passwordResetSuccess,
    };
  }

  async logout(userId: string, refreshToken: string): Promise<LogoutResponse> {
    const key = `auth:logout:${refreshToken}`;

    await redis.set(key, userId, 'EX', env.REFRESH_TOKEN_TTL_SECONDS);

    return {
      success: true,
      message: Messages.auth.success.logoutSuccess,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const blacklisted = await redis.get(`auth:logout:${refreshToken}`);
    if (blacklisted) {
      throw new CustomError(Messages.auth.error.sessionExpired, StatusCode.UNAUTHORIZED);
    }

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      sub: payload.sub,
      role: payload.role,
    });

    return {
      success: true,
      message: Messages.auth.success.tokenRefreshed,
      data: { accessToken },
    };
  }

  private async generateAndSendOtp(email: string, role: NonAdminRole): Promise<void> {
    const otp = generateOtp(6).toString();
    const key = `otp:verify:${role}:${email}`;

    await redis.set(key, JSON.stringify({ otp }), 'EX', env.OTP_TTL_SECONDS);
    console.log(otp);
    await sendOtpMail(email, otp);
  }

  private validateAccountAccess(options: { isBlocked?: boolean; isActive?: boolean }) {
    if (options.isBlocked === true || options.isActive === false) {
      throw new CustomError(Messages.auth.error.accessDenied, StatusCode.FORBIDDEN);
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
