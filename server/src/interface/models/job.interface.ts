import type { Document, Types } from 'mongoose';

export interface IJobDocument extends Document {
  recruiterId: Types.ObjectId;

  title: string;
  role: string;
  skills: string[];

  totalExperienceMonths: number;

  rawMinSalary: number;
  rawMaxSalary: number;

  jobType: string;
  location: string;
  lastDate: Date;
  description: string;

  createdAt: Date;
  updatedAt: Date;
}
