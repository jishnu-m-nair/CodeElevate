import { AUTH_ROUTES } from '../../constants/routes';
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
  const res = await http.post<ApiResponse<LoginData>>(AUTH_ROUTES.LOGIN_USER, data);
  if (!res.data.data) throw new Error(res.data.message);
  return res.data.data;
};

export const loginRecruiterApi = async (data: LoginRequest): Promise<LoginData> => {
  const res = await http.post<ApiResponse<LoginData>>(AUTH_ROUTES.LOGIN_RECRUITER, data);
  if (!res.data.data) throw new Error(res.data.message);
  return res.data.data;
};

export const loginAdminApi = async (data: LoginRequest): Promise<LoginData> => {
  const res = await http.post<ApiResponse<LoginData>>(AUTH_ROUTES.LOGIN_ADMIN, data);
  if (!res.data.data) throw new Error(res.data.message);
  return res.data.data;
};

export const signupUser = async (
  data: UserSignupRequest
): Promise<SignupResponse> => {
  const res = await http.post<ApiResponse<SignupResponse>>(AUTH_ROUTES.SIGNUP_USER, data);
  return res.data.data!;
};

export const signupRecruiter = async (
  data: RecruiterSignupRequest
): Promise<SignupResponse> => {
  const res = await http.post<ApiResponse<SignupResponse>>(AUTH_ROUTES.SIGNUP_RECRUITER, data);
  return res.data.data!;
};

export const verifyUserOtpApi = (data: VerifyOtpRequest) =>
  http.post<ApiResponse<AuthResponse>>(AUTH_ROUTES.VERIFY_OTP_USER, data);

export const verifyRecruiterOtpApi = (data: VerifyOtpRequest) =>
  http.post<ApiResponse<AuthResponse>>(AUTH_ROUTES.VERIFY_OTP_RECRUITER, data);

export const resendUserOtpApi = (email: string) =>
  http.post(AUTH_ROUTES.RESEND_OTP_USER, { email });

export const resendRecruiterOtpApi = (email: string) =>
  http.post(AUTH_ROUTES.RESEND_OTP_RECRUITER, { email });

export const forgotPasswordUserApi = (data: ForgotPasswordRequest) =>
  http.post<ApiResponse<null>>(AUTH_ROUTES.FORGOT_PASSWORD_USER, data);

export const resetPasswordUserApi = (data: ResetPasswordRequest) =>
  http.post<ApiResponse<null>>(AUTH_ROUTES.RESET_PASSWORD_USER, data);

export const forgotPasswordRecruiterApi = (data: ForgotPasswordRequest) =>
  http.post<ApiResponse<null>>(AUTH_ROUTES.FORGOT_PASSWORD_RECRUITER, data);

export const resetPasswordRecruiterApi = (data: ResetPasswordRequest) =>
  http.post<ApiResponse<null>>(AUTH_ROUTES.RESET_PASSWORD_RECRUITER, data);

export const logoutUser = async (): Promise<void> => {
  await http.post(AUTH_ROUTES.LOGOUT_USER);
};

export const logoutRecruiter = async (): Promise<void> => {
  await http.post(AUTH_ROUTES.LOGOUT_RECRUITER);
}

export const logoutAdmin = async (): Promise<void> => {
  await http.post(AUTH_ROUTES.LOGOUT_ADMIN);
}
