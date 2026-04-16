import type { IUserRepository } from '../interface/repositories/userRepo.interface.js';
import { CustomError } from '../errors/CustomError.js';
import type { IUserProfileService } from '../interface/services/userProfileService.interface.js';
import type { IChangePasswordDTO, IEditProfileDTO, IUserProfileDTO } from '../dto/user.dto.js';
import { toUserProfileDTO } from '../mappers/user.mapper.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
import { comparePassword, hashPassword } from '../utils/password.js';

class UserProfileService implements IUserProfileService {
  constructor(private _userRepo: IUserRepository) {}

  async viewProfile(userId: string) {
    const user = await this._userRepo.findById(userId);
    if (!user) throw new CustomError('User not found', 404);

    return toUserProfileDTO(user);
  }

  async editProfile(userId: string, data: IEditProfileDTO): Promise<IUserProfileDTO> {
    const { name, username, phone } = data;

    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new CustomError(Messages.user.error.notFound, StatusCode.NOT_FOUND);
    }

    if (username !== user.username) {
      const existingUser = await this._userRepo.existsByUsername(username);
      if (existingUser) {
        throw new CustomError(Messages.user.error.usernameTaken, StatusCode.BAD_REQUEST);
      }
    }
    const updated = await this._userRepo.updateProfile(userId, {
      name,
      username,
      phone,
    });
    if (!updated) throw new CustomError('data not updated', 404);
    return toUserProfileDTO(updated);
  }

  async changePassword(userId: string, data: IChangePasswordDTO): Promise<void> {
    const { currentPassword, newPassword } = data;

    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new CustomError(Messages.user.error.notFound, StatusCode.NOT_FOUND);
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      throw new CustomError(Messages.user.error.incorrectPassword, StatusCode.BAD_REQUEST);
    }

    const isSame = await comparePassword(newPassword, user.password);
    if (isSame) {
      throw new CustomError(Messages.user.error.samePassword, StatusCode.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(newPassword);

    await this._userRepo.updatePassword(userId, hashedPassword);
  }
}

export default UserProfileService;
