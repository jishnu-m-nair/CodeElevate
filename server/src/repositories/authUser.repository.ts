import type { AuthProvider, IAuthUserDocument } from '../interface/models/authUser.interface.js';
import type { IAuthUserRepository } from '../interface/repositories/authUserRepo.interface.js';
import AuthUserModel from '../models/authUser.model.js';
import { BaseRepository } from './base.repository.js';

class AuthUserRepository extends BaseRepository<IAuthUserDocument> implements IAuthUserRepository {
  constructor() {
    super(AuthUserModel);
  }

  async createAuthUser(data: Partial<IAuthUserDocument>): Promise<IAuthUserDocument> {
    return this.create(data);
  }

  async findByEmail(email: string): Promise<IAuthUserDocument | null> {
    return this.findOne({ email });
  }

  async updateEntityId(authUserId: string, entityId: string): Promise<IAuthUserDocument | null> {
    return this.updateOne({ _id: authUserId }, { entityId });
  }

  async addProvider(authUserId: string, provider: AuthProvider): Promise<IAuthUserDocument | null> {
    return this.updateOne({ _id: authUserId }, { $addToSet: { providers: provider } });
  }

  async updatePassword(authUserId: string, hashedPassword: string): Promise<boolean> {
    return await this.updateRaw({ _id: authUserId }, { password: hashedPassword });
  }

  async blockUser(authUserId: string): Promise<boolean> {
    return await this.updateRaw({ _id: authUserId }, { isBlocked: true });
  }

  async verifyUser(authUserId: string): Promise<boolean> {
    return await this.updateRaw({ _id: authUserId }, { isVerified: true, isBlocked: false });
  }
}

export default AuthUserRepository;
