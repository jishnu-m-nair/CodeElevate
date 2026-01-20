import { Document, Types } from 'mongoose';

export interface IAdminDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
