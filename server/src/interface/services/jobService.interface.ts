import type { IJobDocument } from '../models/job.interface.js';

export interface ICreateJobDTO {
  title: string;
  role: string;
  skills: string[];

  totalExperienceMonths: number;

  rawMinSalary: number;
  rawMaxSalary: number;

  jobType: string;
  location: string;
  lastDate: string;
  description: string;
}

export interface IJobService {
  createJob(recruiterId: string, data: ICreateJobDTO): Promise<IJobDocument>;

  getRecruiterJobs(recruiterId: string): Promise<IJobDocument[]>;
}
