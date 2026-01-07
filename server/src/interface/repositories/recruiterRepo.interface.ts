import type { IRecruiterDocument, RecruiterStatus } from '../models/recruiter.interface.js';

export interface IRecruiterRepository {
  createRecruiter(data: Partial<IRecruiterDocument>): Promise<IRecruiterDocument>;
  findByRecruiterId(recruiterId: string): Promise<IRecruiterDocument | null>;
  updateProfile(
    recruiterId: string,
    data: Partial<IRecruiterDocument>,
  ): Promise<IRecruiterDocument | null>;
  updateStatus(recruiterId: string, status: RecruiterStatus): Promise<void>;
}
