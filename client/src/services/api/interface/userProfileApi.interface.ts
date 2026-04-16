import type { ApiResponse } from "../../../types/apiResponse";

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface EditProfileRequest {
  name: string;
  username: string;
  phone: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export type UserProfileApiResponse = ApiResponse<UserProfile>;
export type BasicApiResponse = ApiResponse<null>;    
export type EditProfileApiResponse = UserProfileApiResponse;