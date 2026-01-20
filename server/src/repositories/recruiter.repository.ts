import type { AuthProvider, RecruiterStatus } from '../interface/common/common.interface.js';
import type { IRecruiterDocument } from '../interface/models/recruiter.interface.js';
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

  async findByEmail(email: string): Promise<IRecruiterDocument | null> {
    return this.findOne({ email });
  }

  private async setBlocked(id: string, blocked: boolean): Promise<boolean> {
    return await this.updateRaw({ _id: id }, { isBlocked: blocked });
  }

  async block(id: string): Promise<boolean> {
    return this.setBlocked(id, true);
  }

  async unblock(id: string): Promise<boolean> {
    return this.setBlocked(id, false);
  }

  async verifyEmail(email: string): Promise<boolean> {
    return await this.updateRaw({ email }, { isVerified: true, isBlocked: false });
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.updateOrFail({ _id: id }, { password: hashedPassword });
  }

  async updateProfile(
    recruiterId: string,
    data: Partial<IRecruiterDocument>,
  ): Promise<IRecruiterDocument | null> {
    return this.updateOne({ _id: recruiterId }, data);
  }

  updateStatus(id: string, status: RecruiterStatus): Promise<boolean> {
    return this.updateRaw({ _id: id }, { status });
  }

  async addProvider(id: string, provider: AuthProvider): Promise<IRecruiterDocument | null> {
    return await this.updateOne({ _id: id }, { $addToSet: { providers: provider } });
  }
}

export default RecruiterRepository;
