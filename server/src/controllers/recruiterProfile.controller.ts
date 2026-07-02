import type { Response, NextFunction } from 'express';
import type { IRecruiterProfileService } from '../interface/services/recruiterProfileService.interface.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import { CustomError } from '../errors/CustomError.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
import { sendResponse } from '../utils/httpResponse.js';

class RecruiterProfileController {
  constructor(private _recruiterProfile: IRecruiterProfileService) {}

  viewProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new CustomError(Messages.recruiter.error.notFound, StatusCode.NOT_FOUND);
      const recruiterId = req.user.sub;

      const profile = await this._recruiterProfile.viewProfile(recruiterId);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.recruiter.success.profileFetched,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  editProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new CustomError(Messages.recruiter.error.notFound, StatusCode.NOT_FOUND);
      const recruiterId = req.user.sub;

      const profile = await this._recruiterProfile.editProfile(recruiterId, { ...req.body });

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.recruiter.success.profileUpdated,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default RecruiterProfileController;
