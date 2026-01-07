import mongoose, { Document } from 'mongoose';

export interface IUserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  authUserId: mongoose.Types.ObjectId;

  name: string;
  email: string;
  username: string;
  phone?: string;
  profilePicture?: string;

  totalScore: number;
  totalSubmissions: number;
  totalAccepted: number;
  contestsPlayed: number;
  jobsApplied: number;

  createdAt: Date;
  updatedAt: Date;
}
