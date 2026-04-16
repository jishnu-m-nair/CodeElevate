import type { IUserProfileDTO } from '../dto/user.dto.js';
import type { IUserDocument } from '../interface/models/user.interface.js';

export const toUserProfileDTO = (user: IUserDocument): IUserProfileDTO => ({
  id: user._id.toString(),
  name: user.name,
  username: user.username,
  phone: user.phone ? user.phone : null,
  email: user.email,
  providers: user.providers,
});
