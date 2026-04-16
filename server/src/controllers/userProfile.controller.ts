import type { Response, NextFunction } from 'express';
import type { IUserProfileService } from '../interface/services/userProfileService.interface.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import { sendResponse } from '../utils/httpResponse.js';
import { StatusCode } from '../enums/statusCode.js';
import { Messages } from '../enums/messages.js';

class UserProfileController {
  constructor(private _userProfile: IUserProfileService) {}

  viewProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.sub;

      const profile = await this._userProfile.viewProfile(userId);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.user.success.profileFetched,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  editProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.sub;

      const { name, username, phone } = req.body;

      const profile = await this._userProfile.editProfile(userId, {
        name,
        username,
        phone,
      });

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.user.success.profileUpdated,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.sub;

      const { currentPassword, newPassword } = req.body;

      await this._userProfile.changePassword(userId, {
        currentPassword,
        newPassword,
      });
      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.user.success.passwordUpdateSuccess,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserProfileController;
