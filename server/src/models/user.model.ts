import mongoose, { Schema } from 'mongoose';
import type { IUserDocument } from '../interface/models/user.interface.js';
import { AUTH_PROVIDERS } from '../interface/common/common.interface.js';

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
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

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: null,
    },

    profilePicture: {
      type: String,
      default: null,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    providers: {
      type: [String],
      enum: AUTH_PROVIDERS,
      required: true,
    },

    totalScore: {
      type: Number,
      default: 0,
    },

    totalSubmissions: {
      type: Number,
      default: 0,
    },

    totalAccepted: {
      type: Number,
      default: 0,
    },

    contestsPlayed: {
      type: Number,
      default: 0,
    },

    jobsApplied: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
export default UserModel;
