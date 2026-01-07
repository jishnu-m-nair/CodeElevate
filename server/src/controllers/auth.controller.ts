import type { Request, Response, NextFunction } from 'express';

import AuthService from '../services/auth.service.js';
import statusCode from '../enums/statusCode.js';
import { env } from '../config/env.config.js';
import Messages from '../enums/messages.js';

class AuthController {
  constructor(private readonly _authService: AuthService) {}

  async userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const { refreshToken, accessToken, user } = await this._authService.userLogin(
        email,
        password,
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(statusCode.OK).json({
        message: Messages.LOGIN_SUCCESS,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async registerWithEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const otpData = await this._authService.registerWithEmail(name, email, password);

      if (!req.session.user) {
        req.session.user = {};
      }

      req.session.user = otpData;

      res.status(statusCode.Created).json({
        message: Messages.USER_REGISTER_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmailOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;

      await this._authService.verifyEmailOtp(email, otp, req.session.user);

      delete req.session.user;

      res.status(statusCode.OK).json({
        message: Messages.USER_EMAIL_VERIFIED,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendEmailOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      const otpData = await this._authService.resendEmailOtp(email);

      if (!req.session.user) {
        req.session.user = {};
      }

      req.session.user = {
        emailOtp: otpData.otp,
        otpEmail: otpData.email,
        otpExpiry: otpData.expiry,
      };

      res.status(statusCode.OK).json({
        message: Messages.RESEND_OTP_SENT,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.status(statusCode.OK).json({ message: Messages.USER_LOGOUT });
  }
}

export default AuthController;
