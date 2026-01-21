import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.config.js';
import type { IAuthService } from '../interface/services/authService.interface.js';
import { sendResponse } from '../utils/httpResponse.js';
import { StatusCode } from '../enums/statusCode.js';
import { verifyRefreshToken } from '../utils/authTokens.js';
import { CustomError } from '../errors/CustomError.js';
import { Messages } from '../enums/messages.js';

class AuthController {
  constructor(private readonly _authService: IAuthService) {}

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.loginUser(req.body);

      const { refreshToken, ...safeData } = result;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.loginSuccess,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  loginRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.loginRecruiter(req.body);

      const { refreshToken, ...safeData } = result;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.loginSuccess,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.loginAdmin(req.body);

      const { refreshToken, ...safeData } = result;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.loginSuccess,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.signupUser(req.body);

      sendResponse(res, StatusCode.CREATED, {
        success: true,
        message: Messages.auth.success.signupSuccess,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  signupRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.signupRecruiter(req.body);

      sendResponse(res, StatusCode.CREATED, {
        success: true,
        message: Messages.auth.success.signupSuccess,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  verifyUserOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.verifyUserOtp(req.body);
      const { refreshToken, ...safeData } = result;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.emailVerified,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  verifyRecruiterOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.verifyRecruiterOtp(req.body);
      const { refreshToken, ...safeData } = result;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.emailVerified,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  resendUserOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._authService.resendUserOtp(req.body);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.otpResent,
      });
    } catch (err) {
      next(err);
    }
  };

  resendRecruiterOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._authService.resendRecruiterOtp(req.body);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.otpResent,
      });
    } catch (err) {
      next(err);
    }
  };

  forgotPasswordUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._authService.forgotPasswordUser(req.body);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.resetLinkSent,
      });
    } catch (err) {
      next(err);
    }
  };

  forgotPasswordRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._authService.forgotPasswordRecruiter(req.body);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.resetLinkSent,
      });
    } catch (err) {
      next(err);
    }
  };

  resetPasswordUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._authService.resetPasswordUser(req.body);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.passwordResetSuccess,
      });
    } catch (err) {
      next(err);
    }
  };

  resetPasswordRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._authService.resetPasswordRecruiter(req.body);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.passwordResetSuccess,
      });
    } catch (err) {
      next(err);
    }
  };

  refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const result = await this._authService.refreshAccessToken(refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.tokenRefreshed,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies['refresh_token'];
      if (!refreshToken) {
        throw new CustomError(Messages.auth.error.unauthorized, 401);
      }
      const payload = verifyRefreshToken(refreshToken);
      const userId = payload.sub;
      if (!userId) {
        throw new CustomError(Messages.auth.error.unauthorized, 401);
      }

      await this._authService.logout(userId, refreshToken);

      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.auth.success.logoutSuccess,
      });
    } catch (err) {
      next(err);
    }
  };

  private setRefreshCookie(res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: env.REFRESH_TOKEN_MAX_AGE,
    });
  }
}

export default AuthController;
