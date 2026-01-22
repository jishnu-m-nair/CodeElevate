import { z } from 'zod';

export const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'Password must be at most 20 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[@$!%*?&#^()_\-+=]/, 'Password must contain at least one special character')
  .refine((pwd) => !pwd.includes(' '), {
    error: 'Password must not contain spaces',
  });

export const emailField = z.email().transform((v) => v.trim().toLowerCase());

export const loginSchema = z
  .object({
    email: emailField,
    password: z.string().min(8),
  })
  .strict();

export const signupSchemaBase = z.object({
  name: z.string().min(2),
  email: emailField,
  password: passwordField,
});

export const signupSchemaUser = signupSchemaBase
  .extend({
    name: z.string(),
  })
  .strict();

export const signupSchemaRecruiter = signupSchemaBase
  .extend({
    companyName: z.string(),
  })
  .strict();

export const otpSchema = z
  .object({
    email: emailField,
    otp: z.string().length(6),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    newPassword: passwordField,
  })
  .strict();

export const emailSchema = z.object({ email: emailField }).strict();
