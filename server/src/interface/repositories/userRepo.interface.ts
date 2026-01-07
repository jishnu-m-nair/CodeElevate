import type { IUserDocument } from '../models/user.interface.js';

export interface IUserRepository {
  createUser(data: Partial<IUserDocument>): Promise<IUserDocument>;
  findByUserId(userId: string): Promise<IUserDocument | null>;
  updateProfile(userId: string, data: Partial<IUserDocument>): Promise<IUserDocument | null>;
}
