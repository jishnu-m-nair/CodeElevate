import mongoose, { Schema } from 'mongoose';
import type { IRecruiterDocument } from '../interface/models/recruiter.interface.js';
import {
  AUTH_PROVIDERS,
  DEFAULT_RECRUITER_STATUS,
  RECRUITER_STATUSES,
} from '../interface/common/common.interface.js';

const RecruiterSchema = new Schema<IRecruiterDocument>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    description: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: null,
    },

    profilePicture: {
      type: String,
      default: null,
    },

    providers: {
      type: [String],
      enum: AUTH_PROVIDERS,
      required: true,
    },

    status: {
      type: String,
      enum: RECRUITER_STATUSES,
      default: DEFAULT_RECRUITER_STATUS,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    totalJobPosts: {
      type: Number,
      default: 0,
    },

    totalHires: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const RecruiterModel = mongoose.model<IRecruiterDocument>('Recruiter', RecruiterSchema);

export default RecruiterModel;
