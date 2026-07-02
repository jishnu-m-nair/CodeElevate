import type { FilterQuery } from 'mongoose';
import type { IJobDocument } from '../models/job.interface.js';

interface Options {
  skip?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}

export interface IJobRepository {
  create(data: Partial<IJobDocument>): Promise<IJobDocument>;

  findMany(filter?: FilterQuery<IJobDocument>, options?: Options): Promise<IJobDocument[]>;

  findById(id: string): Promise<IJobDocument | null>;

  findByRecruiter(recruiterId: string): Promise<IJobDocument[]>;

  update(id: string, data: Partial<IJobDocument>): Promise<IJobDocument | null>;

  delete(id: string): Promise<boolean>;
}
