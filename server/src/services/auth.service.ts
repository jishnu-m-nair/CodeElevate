import StatusCode from '../enums/statusCode.js';
import { CustomError } from '../errors/CustomError.js';
import type { OtpData, LoginResponse } from '../interface/common/common.interface.js';
import AuthUserRepository from '../repositories/authUser.repository.js';
import UserRepository from '../repositories/user.repository.js';
import { generateAccessToken, generateRefreshToken } from '../utils/authTokens.js';
import { sendOtpMail } from '../utils/mailer.js';
import { generateOtp } from '../utils/otp.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateUsernameBase } from '../utils/username.js';

class AuthService {
  constructor(
    private authUserRepo: AuthUserRepository,
    private userRepo: UserRepository,
  ) {}

  async userLogin(email: string, password: string): Promise<LoginResponse> {
    this.validateLoginInput(email, password);

    const authUser = await this.authUserRepo.findByEmail(email);
    if (!authUser) {
      throw new CustomError('Invalid email or password', StatusCode.Unauthorized);
    }
    if (!authUser.password) {
      throw new CustomError('Please use other login methods', StatusCode.BadRequest);
    }
    if (!authUser.isVerified) {
      throw new CustomError('Please verify your email before login', StatusCode.Forbidden);
    }

    if (authUser.isBlocked) {
      throw new CustomError('User is blocked', StatusCode.Forbidden);
    }

    const isMatch = await comparePassword(password, authUser.password);
    if (!isMatch) {
      throw new CustomError('Invalid email or password', StatusCode.Unauthorized);
    }

    const payload = {
      sub: authUser.id,
      role: authUser.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        userId: authUser.entityId.toString(),
        authUserId: authUser.id,
        email: authUser.email,
        role: authUser.role,
      },
    };
  }

  private async generateUsername(name: string, email: string): Promise<string> {
    const base = generateUsernameBase(name, email);
    let username = '';
    let exists = true;

    while (exists) {
      const suffix = Math.floor(1000 + Math.random() * 9000);
      username = `${base}_${suffix}`;

      exists = await this.userRepo.existsByUsername(username);
    }

    return username;
  }

  async registerWithEmail(name: string, email: string, password: string): Promise<OtpData> {
    this.validateRegistrationInput(name, email, password);
    const existing = await this.authUserRepo.findByEmail(email);
    if (existing) {
      if (!existing.isVerified) {
        return await this.generateAndSendOtp(email);
      }
      throw new CustomError('Email already registered', StatusCode.Conflict);
    }

    const hashedPassword = await hashPassword(password);

    const authUser = await this.authUserRepo.createAuthUser({
      email,
      password: hashedPassword,
      role: 'user',
      providers: ['local'],
      isVerified: false,
      isBlocked: false,
    });

    const username = await this.generateUsername(name, email);

    const user = await this.userRepo.createUser({
      name,
      email,
      username,
      authUserId: authUser.id,
    });

    await this.authUserRepo.updateEntityId(authUser.id, user.id);
    return await this.generateAndSendOtp(email);
  }

  async verifyEmailOtp(email: string, otp: string, sessionData: OtpData): Promise<void> {
    if (!sessionData) {
      throw new CustomError('Invalid or Expired Otp', StatusCode.BadRequest);
    }

    if (sessionData.email !== email || sessionData.otp !== otp || Date.now() > sessionData.expiry) {
      throw new CustomError('Invalid or expired OTP', StatusCode.BadRequest);
    }

    const authUser = await this.authUserRepo.findByEmail(email);
    if (!authUser) {
      throw new CustomError('Auth user not found', StatusCode.NotFound);
    }

    if (authUser.isVerified) {
      return;
    }

    await this.authUserRepo.verifyUser(authUser.id);
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const normalized = username.toLowerCase().trim();

    const exists = await this.userRepo.existsByUsername(normalized);
    return !exists;
  }

  async resendEmailOtp(email: string): Promise<OtpData> {
    const authUser = await this.authUserRepo.findByEmail(email);

    if (!authUser) {
      throw new CustomError('Invalid request', StatusCode.BadRequest);
    }

    if (authUser.isVerified) {
      throw new CustomError('Email already verified', StatusCode.Conflict);
    }

    return await this.generateAndSendOtp(email);
  }

  private validateLoginInput(email: string, password: string): void {
    if (!email?.trim()) {
      throw new CustomError('Email is required', StatusCode.BadRequest);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new CustomError('Invalid email format', StatusCode.BadRequest);
    }

    if (!password) {
      throw new CustomError('Password is required', StatusCode.BadRequest);
    }
  }

  private validateRegistrationInput(name: string, email: string, password: string): void {
    if (!name?.trim()) {
      throw new CustomError('Name is required', StatusCode.BadRequest);
    }

    if (!email?.trim()) {
      throw new CustomError('Email is required', StatusCode.BadRequest);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new CustomError('Invalid email format', StatusCode.BadRequest);
    }

    if (!password) {
      throw new CustomError('Password is required', StatusCode.BadRequest);
    }

    if (password.length < 8) {
      throw new CustomError('Password must be at least 8 characters long', StatusCode.BadRequest);
    }
  }

  private async generateAndSendOtp(email: string): Promise<OtpData> {
    const otp = generateOtp(6).toString();
    const expiry = Date.now() + 10 * 60 * 1000;
    console.log('otp : ', otp);
    await sendOtpMail(email, otp);
    return {
      otp,
      email,
      expiry,
    };
  }
}

export default AuthService;
