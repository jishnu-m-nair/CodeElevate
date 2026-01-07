import mongoose, { Schema } from 'mongoose';
import type { IRecruiterDocument } from '../interface/models/recruiter.interface.js';

const RecruiterSchema = new Schema<IRecruiterDocument>(
  {
    authUserId: {
      type: Schema.Types.ObjectId,
      ref: 'AuthUser',
      required: true,
      unique: true,
      index: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
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

    status: {
      type: String,
      enum: ['approved', 'rejected', 'pending'],
      default: 'pending',
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
