import type { IJobRepository } from '../interface/repositories/jobRepo.interface.js';
import type { IJobDocument } from '../interface/models/job.interface.js';
import JobModel from '../models/job.model.js';
import { BaseRepository } from './base.repository.js';

class JobRepository extends BaseRepository<IJobDocument> implements IJobRepository {
  constructor() {
    super(JobModel);
  }

  async findByRecruiter(recruiterId: string): Promise<IJobDocument[]> {
    return this.findMany({ recruiterId }, { sort: { createdAt: -1 } });
  }

  async update(id: string, data: Partial<IJobDocument>): Promise<IJobDocument | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(id);
    return !!res;
  }
}

export default JobRepository;
