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
