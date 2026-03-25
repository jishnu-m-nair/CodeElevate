import type { FilterQuery } from 'mongoose';
import type { AuthProvider } from '../common/common.interface.js';
import type { IUserDocument } from '../models/user.interface.js';

interface Options {
  skip?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  select?: string;
}

export interface IUserRepository {
  create(data: Partial<IUserDocument>): Promise<IUserDocument>;
  findMany(filter?: FilterQuery<IUserDocument>, options?: Options): Promise<IUserDocument[]>;
  findById(id: string): Promise<IUserDocument | null>;
  findByEmail(email: string): Promise<IUserDocument | null>;
  verifyEmail(email: string): Promise<boolean>;
  block(id: string): Promise<boolean>;
  unblock(id: string): Promise<boolean>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
  updateProfile(id: string, data: Partial<IUserDocument>): Promise<IUserDocument | null>;
  addProvider(id: string, provider: AuthProvider): Promise<IUserDocument | null>;
  existsByUsername(username: string): Promise<boolean>;
  count(filter: FilterQuery<IUserDocument>): Promise<number>;
}
