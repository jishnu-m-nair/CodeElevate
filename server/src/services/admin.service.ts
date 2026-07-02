import type { FilterQuery } from 'mongoose';
import type { RecruiterListRequestDTO, UsersListRequestDTO } from '../dto/admin.dto.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
import { CustomError } from '../errors/CustomError.js';
import type { IUserRepository } from '../interface/repositories/userRepo.interface.js';
import type {
  IAdminService,
  IRecruitersListResponseDTO,
  IRecruitersResponseDTO,
  IUsersListResponseDTO,
} from '../interface/services/adminService.interface.js';
import {
  toRecruiterListDTO,
  toRecruiterListItemDTO,
  toUserListItemDTO,
} from '../mappers/admin.mapper.js';
import type { IUserDocument } from '../interface/models/user.interface.js';
import type { IRecruiterRepository } from '../interface/repositories/recruiterRepo.interface.js';
import type { IRecruiterDocument } from '../interface/models/recruiter.interface.js';

class AdminService implements IAdminService {
  constructor(
    private _userRepo: IUserRepository,
    private _recruiterRepo: IRecruiterRepository,
  ) {}

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

  async listRecruiters(query: RecruiterListRequestDTO): Promise<IRecruitersListResponseDTO> {
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

    const filter: FilterQuery<IRecruiterDocument> = {};

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
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
    if (sortBy === 'name') sort['companyName'] = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'joined') sort['createdAt'] = sortOrder === 'asc' ? 1 : -1;

    const [total, recruiters] = await Promise.all([
      this._recruiterRepo.count(filter),
      this._recruiterRepo.findMany(filter, {
        skip,
        limit,
        sort,
        select: '-password',
      }),
    ]);

    return {
      recruiters: recruiters.map(toRecruiterListItemDTO),
      total,
      totalPages: Math.ceil(total / limit),
      page,
    };
  }

  async blockRecruiter(recruiterId: string): Promise<void> {
    const success = await this._recruiterRepo.block(recruiterId);

    if (!success) {
      throw new CustomError(Messages.admin.error.failedBlockRecruiter, StatusCode.BAD_REQUEST);
    }
  }

  async unblockRecruiter(recruiterId: string): Promise<void> {
    const success = await this._recruiterRepo.unblock(recruiterId);

    if (!success) {
      throw new CustomError(Messages.admin.error.failedUnblockRecruiter, StatusCode.BAD_REQUEST);
    }
  }

  async getPendingRecruiters(query: RecruiterListRequestDTO): Promise<IRecruitersResponseDTO> {
    const {
      search,
      status = 'pending',
      joinedFrom,
      joinedTo,
      sortBy = 'joined',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;

    const filter: FilterQuery<IRecruiterDocument> = {};

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = 'pending';
    }

    if (joinedFrom || joinedTo) {
      filter.createdAt = {};
      if (joinedFrom) filter.createdAt.$gte = joinedFrom;
      if (joinedTo) filter.createdAt.$lte = joinedTo;
    }

    const sort: Record<string, 1 | -1> = {};
    if (sortBy === 'name') sort['companyName'] = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'joined') sort['createdAt'] = sortOrder === 'asc' ? 1 : -1;

    const [total, recruiters] = await Promise.all([
      this._recruiterRepo.count(filter),
      this._recruiterRepo.findMany(filter, {
        skip,
        limit,
        sort,
        select: '-password',
      }),
    ]);
    return {
      recruiters: recruiters.map(toRecruiterListDTO),
      total,
      totalPages: Math.ceil(total / limit),
      page,
    };
  }
  async approveRecruiter(recruiterId: string): Promise<void> {
    const success = await this._recruiterRepo.approveRecruiter(recruiterId);

    if (!success) {
      throw new CustomError(Messages.admin.error.failedApproveRecruiter, StatusCode.BAD_REQUEST);
    }
  }

  async rejectRecruiter(recruiterId: string, reason: string): Promise<void> {
    if (!reason || reason.trim() === '') {
      throw new CustomError('Rejection reason is required', StatusCode.BAD_REQUEST);
    }

    const success = await this._recruiterRepo.rejectRecruiter(recruiterId, reason);

    if (!success) {
      throw new CustomError(Messages.admin.error.failedRejectRecruiter, StatusCode.BAD_REQUEST);
    }
  }
}

export default AdminService;
