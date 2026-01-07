import mongoose, { Schema } from 'mongoose';
import type { IUserDocument } from '../interface/models/user.interface.js';

const UserSchema = new Schema<IUserDocument>(
  {
    authUserId: {
      type: Schema.Types.ObjectId,
      ref: 'AuthUser',
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
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
