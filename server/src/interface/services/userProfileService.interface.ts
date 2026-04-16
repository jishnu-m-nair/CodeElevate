import type { IUserProfileDTO, IChangePasswordDTO, IEditProfileDTO } from '../../dto/user.dto.js';

export interface IUserProfileService {
  viewProfile(userId: string): Promise<IUserProfileDTO>;
  editProfile(userId: string, data: IEditProfileDTO): Promise<IUserProfileDTO>;
  changePassword(userId: string, data: IChangePasswordDTO): Promise<void>;
}
