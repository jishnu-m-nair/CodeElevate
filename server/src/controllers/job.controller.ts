import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import type { IJobService } from '../interface/services/jobService.interface.js';
import { CustomError } from '../errors/CustomError.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
import { sendResponse } from '../utils/httpResponse.js';

class JobController {
  constructor(private _jobService: IJobService) {}

  createJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new CustomError(Messages.recruiter.error.notFound, StatusCode.NOT_FOUND);

      const recruiterId = req.user.sub;

      const job = await this._jobService.createJob(recruiterId, req.body);

      sendResponse(res, StatusCode.CREATED, {
        success: true,
        message: Messages.common.success.created,
        data: job,
      });
    } catch (error) {
      next(error);
    }
  };

  getRecruiterJobs = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new CustomError(Messages.recruiter.error.notFound, StatusCode.NOT_FOUND);

      const recruiterId = req.user.sub;

      const jobs = await this._jobService.getRecruiterJobs(recruiterId);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.common.success.fetched,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default JobController;
