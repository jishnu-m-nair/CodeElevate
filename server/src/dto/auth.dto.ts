import type { z } from 'zod';
import type {
  emailSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  signupSchemaRecruiter,
  signupSchemaUser,
} from '../schemas/auth.schema.js';
import type {
  AdminData,
  RecruiterData,
  UserData,
} from '../interface/services/authService.interface.js';

export type LoginRequestDTO = z.infer<typeof loginSchema>;

export type SignupUserRequestDTO = z.infer<typeof signupSchemaUser>;

export type SignupRecruiterRequestDTO = z.infer<typeof signupSchemaRecruiter>;

export type OtpRequestDTO = z.infer<typeof otpSchema>;

export type ResendOtpRequestDTO = z.infer<typeof emailSchema>;

export type ForgotPasswordRequestDTO = z.infer<typeof emailSchema>;

export type ResetPasswordRequestDTO = z.infer<typeof resetPasswordSchema>;

export interface LogoutRequestDTO {
  userId: string;
  refreshToken: string;
}

export interface RefreshAccessTokenResponseDTO {
  accessToken: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserData | RecruiterData | AdminData;
}

export interface SignupResponseDTO {
  userId: string;
  email: string;
}

export interface OtpVerificationResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserData | RecruiterData;
}
