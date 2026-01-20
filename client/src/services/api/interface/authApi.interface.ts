import type { ApiResponse } from "../../../types/apiResponse";
import type { AuthUser } from "../../../types/authTypes";


export interface LoginData {
  accessToken: string;
  user: AuthUser;
}

export type LoginResponse = ApiResponse<LoginData>;


export interface UserSignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface RecruiterSignupRequest {
  companyName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  userId: string;
  email: string;
}


export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}


