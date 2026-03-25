import type { IUserDocument } from '../interface/models/user.interface.js';
import type { IUserListItemDTO } from '../dto/admin.dto.js';

export const toUserListItemDTO = (user: IUserDocument): IUserListItemDTO => ({
  id: user._id.toString(),
  name: user.name,
  username: user.username,
  email: user.email,
  status: user.isBlocked ? 'Blocked' : 'Active',
  joined: user.createdAt.toISOString(),
});
