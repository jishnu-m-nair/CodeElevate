import { Document, Types } from 'mongoose';
import type { AuthProvider, RecruiterStatus } from '../common/common.interface.js';

export interface IRecruiterDocument extends Document {
  reason: string;
  _id: Types.ObjectId;
  companyName: string;
  email: string;
  password: string;
  companyWebsite: string;
  linkedInUrl?: string;
  rejectionReason?: string;
  description?: string;
  bio?: string;
  phone?: string;
  profilePicture?: string;
  providers: AuthProvider[];
  isBlocked: boolean;
  isVerified: boolean;
  status: RecruiterStatus;
  verifiedAt?: Date;

  //Cached recruiter stats (derived)
  totalJobPosts: number;
  totalHires: number;

  createdAt: Date;
  updatedAt: Date;
}
