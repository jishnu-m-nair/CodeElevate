import type { AuthProvider, RecruiterStatus } from '../interface/common/common.interface.js';
import type { IRecruiterDocument } from '../interface/models/recruiter.interface.js';
import type { IRecruiterRepository } from '../interface/repositories/recruiterRepo.interface.js';
import RecruiterModel from '../models/recruiter.model.js';
import type { MongoSet, MongoUnset } from '../types/mongodbTypes.js';
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
    data: {
      set?: MongoSet<IRecruiterDocument>;
      unset?: MongoUnset<IRecruiterDocument>;
    },
  ): Promise<IRecruiterDocument | null> {
    const updateQuery: {
      $set?: MongoSet<IRecruiterDocument>;
      $unset?: MongoUnset<IRecruiterDocument>;
    } = {};

    if (data.set && Object.keys(data.set).length > 0) {
      updateQuery.$set = data.set;
    }

    if (data.unset && Object.keys(data.unset).length > 0) {
      updateQuery.$unset = data.unset;
    }

    return this.model.findByIdAndUpdate(recruiterId, updateQuery, {
      new: true,
    });
  }

  updateStatus(id: string, status: RecruiterStatus): Promise<boolean> {
    return this.updateRaw({ _id: id }, { status });
  }

  async addProvider(id: string, provider: AuthProvider): Promise<IRecruiterDocument | null> {
    return await this.updateOne({ _id: id }, { $addToSet: { providers: provider } });
  }

  async findByStatus(status: string): Promise<IRecruiterDocument[] | null> {
    return this.findMany({ status });
  }

  async approveRecruiter(id: string): Promise<boolean> {
    return this.updateRaw(
      { _id: id },
      {
        status: 'approved',
      },
    );
  }

  async rejectRecruiter(id: string, reason: string): Promise<boolean> {
    return this.updateRaw(
      { _id: id },
      {
        status: 'rejected',
        rejectionReason: reason,
      },
    );
  }
}

export default RecruiterRepository;
