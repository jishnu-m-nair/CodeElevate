import type { AuthProvider } from '../interface/common/common.interface.js';

export interface IUserProfileDTO {
  id: string;
  name: string;
  username: string;
  phone: string | null;
  email: string;
  providers: AuthProvider[];
}

export interface IEditProfileDTO {
  name: string;
  username: string;
  phone: string;
}

export interface IChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
