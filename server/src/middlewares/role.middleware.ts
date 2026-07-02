import type { NextFunction, Response } from 'express';
import type { AuthRole } from '../enums/common.enums.js';
import type { AuthRequest } from './auth.middleware.js';
import { CustomError } from '../errors/CustomError.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
import RecruiterRepository from '../repositories/recruiter.repository.js';

export const authorize =
  (...allowedRoles: AuthRole[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new CustomError(Messages.auth.error.unauthorized, StatusCode.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(user.role)) {
      throw new CustomError(Messages.auth.error.accessDenied, StatusCode.FORBIDDEN);
    }

    next();
  };

export const checkRecruiterApproved = async (
  req: Express.TypedRequest,
  _res: Response,
  next: NextFunction,
) => {
  const recruiterRepo = new RecruiterRepository();
  const recruiter = await recruiterRepo.findById(req.user.sub);

  if (!recruiter) {
    throw new CustomError('Recruiter not found', StatusCode.NOT_FOUND);
  }

  if (recruiter.status === 'pending') {
    throw new CustomError(
      'Your account is under review. Please come back later.',
      StatusCode.FORBIDDEN,
    );
  }

  if (recruiter.status === 'rejected') {
    throw new CustomError(
      `Your account was rejected. Reason: ${recruiter.rejectionReason || 'No reason provided'}`,
      StatusCode.FORBIDDEN,
    );
  }

  next();
};
