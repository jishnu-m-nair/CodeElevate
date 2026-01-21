import type { NextFunction, Response } from 'express';
import type { AuthRole } from '../enums/common.enums.js';
import type { AuthRequest } from './auth.middleware.js';
import { CustomError } from '../errors/CustomError.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';

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
