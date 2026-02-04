import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.config.js';
import { CustomError } from '../errors/CustomError.js';
import { StatusCode } from '../enums/statusCode.js';

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export interface GoogleProfile {
  email: string;
  name: string;
}

export const verifyGoogleToken = async (token: string): Promise<GoogleProfile> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload?.email) {
    throw new CustomError('Invalid Google token', StatusCode.UNAUTHORIZED);
  }

  return {
    email: payload.email,
    name: payload.name ?? '',
  };
};
