import type { IJobService, ICreateJobDTO } from '../interface/services/jobService.interface.js';
import type { IJobRepository } from '../interface/repositories/jobRepo.interface.js';
import type { IJobDocument } from '../interface/models/job.interface.js';
import { Types } from 'mongoose';

class JobService implements IJobService {
  constructor(private _jobRepo: IJobRepository) {}

  async createJob(recruiterId: string, data: ICreateJobDTO): Promise<IJobDocument> {
    const jobData = {
      ...data,
      recruiterId: new Types.ObjectId(recruiterId),
    };
    return await this._jobRepo.create(jobData);
  }

  async getRecruiterJobs(recruiterId: string): Promise<IJobDocument[]> {
    return this._jobRepo.findByRecruiter(recruiterId);
  }
}

export default JobService;
