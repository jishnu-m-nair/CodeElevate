import type { IUserDocument } from '../interface/models/user.interface.js';
import type { IUserRepository } from '../interface/repositories/userRepo.interface.js';
import UserModel from '../models/user.model.js';
import { BaseRepository } from './base.repository.js';

class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async createUser(data: Partial<IUserDocument>): Promise<IUserDocument> {
    return this.create(data);
  }

  async findByUserId(userId: string): Promise<IUserDocument | null> {
    return super.findById(userId);
  }

  async updateProfile(userId: string, data: Partial<IUserDocument>): Promise<IUserDocument | null> {
    return this.updateOne({ _id: userId }, data);
  }

  async existsByUsername(username: string): Promise<boolean> {
    const count = await this.model.countDocuments({ username });
    return count > 0;
  }
}

export default UserRepository;
