import type { Types } from 'mongoose';

export interface IAuthService {
  loginUser(email: string, password: string): Promise<LoginResponse>;
  loginRecruiter(email: string, password: string): Promise<LoginResponse>;
  loginAdmin(email: string, password: string): Promise<LoginResponse>;

  signupUser(userData: SignupUserDTO): Promise<SignupResponse>;
  signupRecruiter(recruiterData: SignupRecruiterDTO): Promise<SignupResponse>;

  verifyUserOtp(email: string, otp: string): Promise<OtpVerificationResponse>;
  verifyRecruiterOtp(email: string, otp: string): Promise<OtpVerificationResponse>;
  resendUserOtp(email: string): Promise<ResendOtpResponse>;
  resendRecruiterOtp(email: string): Promise<ResendOtpResponse>;

  forgotPasswordUser(email: string): Promise<ForgotPasswordResponse>;
  forgotPasswordRecruiter(email: string): Promise<ForgotPasswordResponse>;
  resetPasswordUser(token: string, newPassword: string): Promise<ResetPasswordResponse>;
  resetPasswordRecruiter(token: string, newPassword: string): Promise<ResetPasswordResponse>;

  logout(userId: string, refreshToken: string): Promise<LogoutResponse>;
  refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse>;
}

export interface AuthEntity {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  providers?: string[];
  isVerified?: boolean;
}

export interface SignupUserDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface SignupRecruiterDTO {
  email: string;
  password: string;
  companyName: string;
  phone?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserData | RecruiterData | AdminData;
  };
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
  };
}

export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserData | RecruiterData;
  };
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
  };
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'user';
  isVerified: boolean;
}

export interface RecruiterData {
  id: string;
  email: string;
  companyName: string;
  role: 'recruiter';
  isVerified: boolean;
}

export interface AdminData {
  id: string;
  email: string;
  role: 'admin';
}

export type AuthPayload = UserData | RecruiterData | AdminData;
