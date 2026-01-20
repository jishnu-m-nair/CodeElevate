import { Document, Types } from 'mongoose';
import type { AuthProvider } from '../common/common.interface.js';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  username: string;
  phone?: string;
  profilePicture?: string;
  isBlocked: boolean;
  isVerified: boolean;
  providers: AuthProvider[];

  //Cached user stats (derived)
  totalScore: number;
  totalSubmissions: number;
  totalAccepted: number;
  contestsPlayed: number;
  jobsApplied: number;

  createdAt: Date;
  updatedAt: Date;
}
