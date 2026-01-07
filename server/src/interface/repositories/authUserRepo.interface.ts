import type { AuthProvider, IAuthUserDocument } from '../models/authUser.interface.js';

export interface IAuthUserRepository {
  createAuthUser(data: Partial<IAuthUserDocument>): Promise<IAuthUserDocument>;

  findByEmail(email: string): Promise<IAuthUserDocument | null>;

  findById(id: string): Promise<IAuthUserDocument | null>;

  updateEntityId(authUserId: string, entityId: string): Promise<IAuthUserDocument | null>;

  addProvider(authUserId: string, provider: AuthProvider): Promise<IAuthUserDocument | null>;

  updatePassword(authUserId: string, hashedPassword: string): Promise<boolean>;

  blockUser(authUserId: string): Promise<boolean>;

  verifyUser(authUserId: string): Promise<boolean>;
}
