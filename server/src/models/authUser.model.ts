import mongoose, { Schema } from 'mongoose';
import type { IAuthUserDocument } from '../interface/models/authUser.interface.js';

const AuthUserSchema = new Schema<IAuthUserDocument>(
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
    },

    providers: {
      type: [String],
      enum: ['local', 'google'],
      required: true,
    },

    role: {
      type: String,
      enum: ['admin', 'recruiter', 'user'],
      required: true,
    },

    entityId: {
      type: Schema.Types.ObjectId,
      required: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const AuthUserModel = mongoose.model<IAuthUserDocument>('AuthUser', AuthUserSchema);

export default AuthUserModel;
