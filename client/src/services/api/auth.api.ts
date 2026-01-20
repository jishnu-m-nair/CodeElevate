import type { ApiResponse } from '../../types/apiResponse';
import type { AuthResponse } from '../../types/authTypes';
import http from '../http';
import type {
  LoginRequest,
  VerifyOtpRequest,
  LoginData,
  UserSignupRequest,
  RecruiterSignupRequest,
  SignupResponse,
} from './interface/authApi.interface';

export const login = async (
  data: LoginRequest
): Promise<LoginData> => {
  const response = await http.post<ApiResponse<LoginData>>('/login', data);

  if (!response.data.data) {
    throw new Error(response.data.message || "Login failed");
  }

  return response.data.data;
};

export const signupUser = async (
  data: UserSignupRequest
): Promise<SignupResponse> => {
  console.log('hey inside')
  const res = await http.post<ApiResponse<SignupResponse>>("/signup", data);
  console.log('hey outside')
  return res.data.data!;
};

export const signupRecruiter = async (
  data: RecruiterSignupRequest
): Promise<SignupResponse> => {
  const res = await http.post<ApiResponse<SignupResponse>>("/recruiter/signup", data);
  return res.data.data!;
};

export const verifyUserOtpApi = (data: VerifyOtpRequest) =>
  http.post<ApiResponse<AuthResponse>>("/verify-otp", data);

export const verifyRecruiterOtpApi = (data: VerifyOtpRequest) =>
  http.post<ApiResponse<AuthResponse>>("/recruiter/verify-otp", data);

export const resendUserOtpApi = (email: string) =>
  http.post("/resend-otp", { email });

export const resendRecruiterOtpApi = (email: string) =>
  http.post("/recruiter/resend-otp", { email });


export const logoutUser = async (): Promise<void> => {
  await http.post('/logout');
};
