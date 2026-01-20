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
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from './interface/authApi.interface';

export const loginUserApi = async (data: LoginRequest): Promise<LoginData> => {
  const res = await http.post<ApiResponse<LoginData>>('/login', data);
  if (!res.data.data) throw new Error(res.data.message);
  return res.data.data;
};

export const loginRecruiterApi = async (data: LoginRequest): Promise<LoginData> => {
  const res = await http.post<ApiResponse<LoginData>>('/recruiter/login', data);
  if (!res.data.data) throw new Error(res.data.message);
  return res.data.data;
};

export const loginAdminApi = async (data: LoginRequest): Promise<LoginData> => {
  const res = await http.post<ApiResponse<LoginData>>('/admin/login', data);
  if (!res.data.data) throw new Error(res.data.message);
  return res.data.data;
};


export const signupUser = async (
  data: UserSignupRequest
): Promise<SignupResponse> => {
  const res = await http.post<ApiResponse<SignupResponse>>("/signup", data);
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

export const forgotPasswordUserApi = (data: ForgotPasswordRequest) =>
  http.post<ApiResponse<null>>("/forgot-password", data);

export const resetPasswordUserApi = (data: ResetPasswordRequest) =>
  http.post<ApiResponse<null>>("/reset-password", data);

export const forgotPasswordRecruiterApi = (data: ForgotPasswordRequest) =>
  http.post<ApiResponse<null>>("/recruiter/forgot-password", data);

export const resetPasswordRecruiterApi = (data: ResetPasswordRequest) =>
  http.post<ApiResponse<null>>("/recruiter/reset-password", data);

export const logoutUser = async (): Promise<void> => {
  await http.post('/logout');
};

export const logoutRecruiter = async (): Promise<void> => {
  await http.post('/recruiter/logout');
}

export const logoutAdmin = async (): Promise<void> => {
  await http.post('/admin/logout');
}
