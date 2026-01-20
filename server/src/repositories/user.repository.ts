import type { AuthProvider } from '../interface/common/common.interface.js';
import type { IUserDocument } from '../interface/models/user.interface.js';
import type { IUserRepository } from '../interface/repositories/userRepo.interface.js';
import UserModel from '../models/user.model.js';
import { BaseRepository } from './base.repository.js';

class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.findOne({ email });
  }

  private async setBlocked(id: string, blocked: boolean): Promise<boolean> {
    return await this.updateRaw({ _id: id }, { isBlocked: blocked });
  }

  async block(id: string): Promise<boolean> {
    return this.setBlocked(id, true);
  }

  async verifyEmail(email: string): Promise<boolean> {
    return await this.updateRaw({ email }, { isVerified: true, isBlocked: false });
  }

  async unblock(id: string): Promise<boolean> {
    return this.setBlocked(id, false);
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.updateOrFail({ _id: id }, { password: hashedPassword });
  }

  async updateProfile(id: string, data: Partial<IUserDocument>): Promise<IUserDocument | null> {
    return this.updateOne({ _id: id }, data);
  }

  async addProvider(id: string, provider: AuthProvider): Promise<IUserDocument | null> {
    return await this.updateOne({ _id: id }, { $addToSet: { providers: provider } });
  }

  async existsByUsername(username: string): Promise<boolean> {
    const result = await this.model.exists({ username });
    return result !== null;
  }
}

export default UserRepository;
