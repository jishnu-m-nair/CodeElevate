export interface OtpData {
  otp: string;
  email: string;
  expiry: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: string;
    authUserId: string;
    email: string;
    role: string;
  };
}

export type RecruiterStatus = 'approved' | 'rejected' | 'pending';

export const RECRUITER_STATUSES: RecruiterStatus[] = ['approved', 'rejected', 'pending'];
export const DEFAULT_RECRUITER_STATUS: RecruiterStatus = 'pending';

export type AuthProvider = 'local' | 'google';

export const AUTH_PROVIDERS: AuthProvider[] = ['local', 'google'];

export type AuthRole = 'admin' | 'recruiter' | 'user';
