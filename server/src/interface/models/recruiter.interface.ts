import mongoose, { Document } from 'mongoose';

export type RecruiterStatus = 'approved' | 'rejected' | 'pending';

export interface IRecruiterDocument extends Document {
  _id: mongoose.Types.ObjectId;
  authUserId: mongoose.Types.ObjectId;

  companyName: string;
  description?: string;
  phone?: string;
  profilePicture?: string;

  status: RecruiterStatus;
  verifiedAt?: Date;

  totalJobPosts: number;
  totalHires: number;

  createdAt: Date;
  updatedAt: Date;
}
