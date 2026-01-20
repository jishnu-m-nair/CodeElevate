import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.config.js';
import type { IAuthService } from '../interface/services/authService.interface.js';
import { sendResponse } from '../utils/httpResponse.js';
import { StatusCode } from '../enums/statusCode.js';

class AuthController {
  constructor(private readonly _authService: IAuthService) {}

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this._authService.loginUser(email, password);

      const { refreshToken, ...safeData } = result.data;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: result.success,
        message: result.message,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  loginRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this._authService.loginRecruiter(email, password);

      const { refreshToken, ...safeData } = result.data;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: result.success,
        message: result.message,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this._authService.loginAdmin(email, password);

      const { refreshToken, ...safeData } = result.data;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: result.success,
        message: result.message,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.signupUser(req.body);

      sendResponse(res, StatusCode.CREATED, result);
    } catch (err) {
      next(err);
    }
  };

  signupRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._authService.signupRecruiter(req.body);

      sendResponse(res, StatusCode.CREATED, result);
    } catch (err) {
      next(err);
    }
  };

  verifyUserOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } = req.body;
      const result = await this._authService.verifyUserOtp(email, otp);
      const { refreshToken, ...safeData } = result.data;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: result.success,
        message: result.message,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  verifyRecruiterOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } = req.body;
      const result = await this._authService.verifyRecruiterOtp(email, otp);
      const { refreshToken, ...safeData } = result.data;

      this.setRefreshCookie(res, refreshToken);

      sendResponse(res, StatusCode.OK, {
        success: result.success,
        message: result.message,
        data: safeData,
      });
    } catch (err) {
      next(err);
    }
  };

  resendUserOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this._authService.resendUserOtp(email);

      sendResponse(res, StatusCode.OK, result);
    } catch (err) {
      next(err);
    }
  };

  resendRecruiterOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this._authService.resendRecruiterOtp(email);

      sendResponse(res, StatusCode.OK, result);
    } catch (err) {
      next(err);
    }
  };

  forgotPasswordUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this._authService.forgotPasswordUser(email);

      sendResponse(res, StatusCode.OK, result);
    } catch (err) {
      next(err);
    }
  };

  forgotPasswordRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this._authService.forgotPasswordRecruiter(email);

      sendResponse(res, StatusCode.OK, result);
    } catch (err) {
      next(err);
    }
  };

  resetPasswordUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      const result = await this._authService.resetPasswordUser(token, newPassword);

      sendResponse(res, StatusCode.OK, result);
    } catch (err) {
      next(err);
    }
  };

  resetPasswordRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      const result = await this._authService.resetPasswordRecruiter(token, newPassword);

      sendResponse(res, StatusCode.OK, result);
    } catch (err) {
      next(err);
    }
  };

  refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const result = await this._authService.refreshAccessToken(refreshToken);

      sendResponse(res, StatusCode.OK, result);
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const refreshToken = req.cookies['refresh_token'];

      const result = await this._authService.logout(userId, refreshToken);

      res.clearCookie('refresh_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: env.NODE_ENV === 'production',
      });

      sendResponse(res, StatusCode.OK, result);
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
