import jwt, { type JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env.config.js';
import { CustomError } from '../errors/CustomError.js';

export interface TokenPayload extends JwtPayload {
  role: 'admin' | 'user' | 'recruiter';
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d',
  });
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET!) as JwtPayload;

    if (!decoded.sub || !decoded['role']) {
      throw new Error('Invalid token payload');
    }

    return {
      sub: decoded.sub,
      role: decoded['role'],
    };
  } catch {
    throw new CustomError('Invalid or expired refresh token', 401);
  }
};
