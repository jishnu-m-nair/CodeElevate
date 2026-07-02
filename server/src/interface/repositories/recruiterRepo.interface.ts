import type { FilterQuery } from 'mongoose';
import type { MongoSet, MongoUnset } from '../../types/mongodbTypes.js';
import type { AuthProvider, RecruiterStatus } from '../common/common.interface.js';
import type { IRecruiterDocument } from '../models/recruiter.interface.js';

interface Options {
  skip?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  select?: string;
}

export interface IRecruiterRepository {
  create(data: Partial<IRecruiterDocument>): Promise<IRecruiterDocument>;
  findMany(
    filter?: FilterQuery<IRecruiterDocument>,
    options?: Options,
  ): Promise<IRecruiterDocument[]>;
  findById(id: string): Promise<IRecruiterDocument | null>;
  findByEmail(email: string): Promise<IRecruiterDocument | null>;
  verifyEmail(email: string): Promise<boolean>;
  block(id: string): Promise<boolean>;
  unblock(id: string): Promise<boolean>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
  updateProfile(
    id: string,
    data: { set?: MongoSet<IRecruiterDocument>; unset?: MongoUnset<IRecruiterDocument> },
  ): Promise<IRecruiterDocument | null>;
  updateStatus(id: string, status: RecruiterStatus): Promise<boolean>;
  addProvider(id: string, provider: AuthProvider): Promise<IRecruiterDocument | null>;
  count(filter: FilterQuery<IRecruiterDocument>): Promise<number>;
  findByStatus(status: string): Promise<IRecruiterDocument[] | null>;
  approveRecruiter(id: string): Promise<boolean>;
  rejectRecruiter(id: string, reason: string): Promise<boolean>;
}
