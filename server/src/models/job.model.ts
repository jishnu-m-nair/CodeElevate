import mongoose, { Schema } from 'mongoose';
import type { IJobDocument } from '../interface/models/job.interface.js';

const JobSchema = new Schema<IJobDocument>(
  {
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: 'Recruiter',
      required: true,
    },

    title: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    skills: [{ type: String, required: true }],

    totalExperienceMonths: { type: Number, required: true },

    rawMinSalary: { type: Number, required: true },
    rawMaxSalary: { type: Number, required: true },

    jobType: { type: String, required: true },
    location: { type: String, required: true },

    lastDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const JobModel = mongoose.model<IJobDocument>('Job', JobSchema);
export default JobModel;
