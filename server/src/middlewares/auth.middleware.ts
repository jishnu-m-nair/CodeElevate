import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthPayload } from '../interface/services/authService.interface.js';
import { CustomError } from '../errors/CustomError.js';
import { env } from '../config/env.config.js';
import type { TokenPayload } from '../utils/authTokens.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticate = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new CustomError(Messages.auth.error.unauthorized, StatusCode.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET!) as TokenPayload;

    if (!decoded.sub || !decoded['role']) {
      throw new CustomError(Messages.auth.error.invalidTokenPayload, StatusCode.UNAUTHORIZED);
    }

    req.user = {
      sub: decoded.sub,
      role: decoded['role'] as AuthPayload['role'],
    };

    next();
  } catch {
    throw new CustomError(Messages.auth.error.tokenInvalid, StatusCode.UNAUTHORIZED);
  }
};
