import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';

export interface TokenPayload {
  sub: string;
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
