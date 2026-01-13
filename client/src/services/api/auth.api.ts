import http from '../http';
import type {
  SignupRequest,
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
} from './interface/authApi.interface';

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await http.post<LoginResponse>('/login', data);
  return response.data;
};

export const signupUser = async (data: SignupRequest): Promise<void> => {
  await http.post('/signup', data);
};

export const verifyOtp = async (data: VerifyOtpRequest): Promise<void> => {
  await http.post('/verify-otp', data);
};

export const logoutUser = async (): Promise<void> => {
  await http.post('/logout');
};
