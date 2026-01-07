import type {
  IRecruiterDocument,
  RecruiterStatus,
} from '../interface/models/recruiter.interface.js';
import type { IRecruiterRepository } from '../interface/repositories/recruiterRepo.interface.js';
import RecruiterModel from '../models/recruiter.model.js';
import { BaseRepository } from './base.repository.js';

class RecruiterRepository
  extends BaseRepository<IRecruiterDocument>
  implements IRecruiterRepository
{
  constructor() {
    super(RecruiterModel);
  }

  async createRecruiter(data: Partial<IRecruiterDocument>): Promise<IRecruiterDocument> {
    return this.create(data);
  }

  async findByRecruiterId(recruiterId: string): Promise<IRecruiterDocument | null> {
    return super.findById(recruiterId);
  }

  async updateProfile(
    recruiterId: string,
    data: Partial<IRecruiterDocument>,
  ): Promise<IRecruiterDocument | null> {
    return this.updateOne({ _id: recruiterId }, data);
  }

  async updateStatus(recruiterId: string, status: RecruiterStatus): Promise<void> {
    await this.model.updateOne({ _id: recruiterId }, { status });
  }
}

export default RecruiterRepository;
