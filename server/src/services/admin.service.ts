import type { FilterQuery } from 'mongoose';
import type { UsersListRequestDTO } from '../dto/admin.dto.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
import { CustomError } from '../errors/CustomError.js';
import type { IUserRepository } from '../interface/repositories/userRepo.interface.js';
import type {
  IAdminService,
  IUsersListResponseDTO,
} from '../interface/services/adminService.interface.js';
import { toUserListItemDTO } from '../mappers/admin.mapper.js';
import type { IUserDocument } from '../interface/models/user.interface.js';

class AdminService implements IAdminService {
  constructor(private _userRepo: IUserRepository) {}

  async listUsers(query: UsersListRequestDTO): Promise<IUsersListResponseDTO> {
    const {
      search,
      status,
      joinedFrom,
      joinedTo,
      sortBy = 'joined',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<IUserDocument> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.isBlocked = status === 'Blocked';
    }

    if (joinedFrom || joinedTo) {
      filter.createdAt = {};
      if (joinedFrom) filter.createdAt.$gte = joinedFrom;
      if (joinedTo) filter.createdAt.$lte = joinedTo;
    }

    const sort: Record<string, 1 | -1> = {};
    if (sortBy === 'name') sort['name'] = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'joined') sort['createdAt'] = sortOrder === 'asc' ? 1 : -1;

    const [total, users] = await Promise.all([
      this._userRepo.count(filter),
      this._userRepo.findMany(filter, {
        skip,
        limit,
        sort,
        select: '-password',
      }),
    ]);

    return {
      users: users.map(toUserListItemDTO),
      total,
      totalPages: Math.ceil(total / limit),
      page,
    };
  }

  async blockUser(userId: string): Promise<void> {
    const success = await this._userRepo.block(userId);

    if (!success) {
      throw new CustomError(Messages.admin.error.failedBlockUser, StatusCode.BAD_REQUEST);
    }
  }

  async unblockUser(userId: string): Promise<void> {
    const success = await this._userRepo.unblock(userId);

    if (!success) {
      throw new CustomError(Messages.admin.error.failedUnblockUser, StatusCode.BAD_REQUEST);
    }
  }
}

export default AdminService;
