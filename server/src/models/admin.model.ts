import { model, Schema } from 'mongoose';
import type { IAdminDocument } from '../interface/models/admin.interface.js';

const AdminSchema = new Schema<IAdminDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const AdminModel = model<IAdminDocument>('Admin', AdminSchema);
