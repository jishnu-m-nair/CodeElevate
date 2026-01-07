import mongoose, { Document } from 'mongoose';

export type AuthProvider = 'local' | 'google';
export type AuthRole = 'admin' | 'recruiter' | 'user';

export interface IAuthUserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  providers: AuthProvider[];
  role: AuthRole;
  entityId: mongoose.Types.ObjectId;
  isBlocked: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
