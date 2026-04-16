import { z } from 'zod';
import { passwordField } from './auth.schema.js';

export const nameField = z
  .string()
  .trim()
  .min(2, 'Name is too short')
  .max(50, 'Name cannot exceed 50 characters')
  .regex(/^[a-zA-Z\s-]+$/, 'Name can only contain letters and hyphens');

export const usernameField = z
  .string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username cannot exceed 20 characters')
  .regex(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores');

export const phoneField = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian phone number');

export const updateProfileSchema = z
  .object({
    name: nameField,
    username: usernameField,
    phone: phoneField,
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: passwordField,
    newPassword: passwordField,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })
  .strict();
