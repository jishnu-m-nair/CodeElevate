import type { Types } from 'mongoose';
import type {
  ForgotPasswordRequestDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  OtpRequestDTO,
  OtpVerificationResponseDTO,
  RefreshAccessTokenResponseDTO,
  ResendOtpRequestDTO,
  ResetPasswordRequestDTO,
  SignupRecruiterRequestDTO,
  SignupResponseDTO,
  SignupUserRequestDTO,
} from '../../dto/auth.dto.js';

export interface IAuthService {
  loginUser(data: LoginRequestDTO): Promise<LoginResponseDTO>;
  loginRecruiter(data: LoginRequestDTO): Promise<LoginResponseDTO>;
  loginAdmin(data: LoginRequestDTO): Promise<LoginResponseDTO>;

  signupUser(data: SignupUserRequestDTO): Promise<SignupResponseDTO>;
  signupRecruiter(data: SignupRecruiterRequestDTO): Promise<SignupResponseDTO>;

  verifyUserOtp(data: OtpRequestDTO): Promise<OtpVerificationResponseDTO>;
  verifyRecruiterOtp(data: OtpRequestDTO): Promise<OtpVerificationResponseDTO>;
  resendUserOtp(data: ResendOtpRequestDTO): Promise<void>;
  resendRecruiterOtp(data: ResendOtpRequestDTO): Promise<void>;

  forgotPasswordUser(data: ForgotPasswordRequestDTO): Promise<void>;
  forgotPasswordRecruiter(data: ForgotPasswordRequestDTO): Promise<void>;
  resetPasswordUser(data: ResetPasswordRequestDTO): Promise<void>;
  resetPasswordRecruiter(data: ResetPasswordRequestDTO): Promise<void>;

  logout(userId: string, refreshToken: string): Promise<void>;
  refreshAccessToken(refreshToken: string): Promise<RefreshAccessTokenResponseDTO>;
}

export interface AuthEntity {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  providers?: string[];
  isVerified?: boolean;
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
