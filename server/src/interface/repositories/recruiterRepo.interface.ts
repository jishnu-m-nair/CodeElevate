import type { AuthProvider, RecruiterStatus } from '../common/common.interface.js';
import type { IRecruiterDocument } from '../models/recruiter.interface.js';

export interface IRecruiterRepository {
  create(data: Partial<IRecruiterDocument>): Promise<IRecruiterDocument>;
  findById(id: string): Promise<IRecruiterDocument | null>;
  findByEmail(email: string): Promise<IRecruiterDocument | null>;
  verifyEmail(email: string): Promise<boolean>;
  block(id: string): Promise<boolean>;
  unblock(id: string): Promise<boolean>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
  updateProfile(id: string, data: Partial<IRecruiterDocument>): Promise<IRecruiterDocument | null>;
  updateStatus(id: string, status: RecruiterStatus): Promise<boolean>;
  addProvider(id: string, provider: AuthProvider): Promise<IRecruiterDocument | null>;
}
