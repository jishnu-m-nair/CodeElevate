import { z } from 'zod';

export const updateRecruiterProfileSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, 'Company name is required')
      .max(100, 'Max 100 characters')
      .regex(/^[a-zA-Z0-9. -]+$/, 'Invalid company name'),

    companyWebsite: z.url('Invalid URL format').min(1, 'Company website is required'),

    linkedInUrl: z
      .url({ message: 'Invalid URL format' })
      .includes('linkedin.com', { message: 'Must be a valid LinkedIn URL' }),

    phone: z.union([
      z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, {
          message: 'Invalid phone number',
        }),
      z.literal(''),
      z.undefined(),
    ]),

    bio: z.string().max(300, 'Max 300 characters').optional().or(z.literal('')),
  })
  .strict();
