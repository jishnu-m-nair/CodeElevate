import z from 'zod';

export const listUsersQuerySchema = z
  .object({
    search: z.string().min(1).optional(),
    status: z.enum(['Active', 'Blocked']).optional(),
    joinedFrom: z.coerce.date().optional(),
    joinedTo: z.coerce.date().optional(),
    sortBy: z.enum(['name', 'joined']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional(),
  })
  .strip();

export const listRecruitersQuerySchema = z
  .object({
    search: z.string().min(1).optional(),
    status: z.enum(['Active', 'Blocked']).optional(),
    joinedFrom: z.coerce.date().optional(),
    joinedTo: z.coerce.date().optional(),
    sortBy: z.enum(['name', 'joined']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional(),
  })
  .strip();

export const PendingRecruitersQuerySchema = z
  .object({
    search: z.string().min(1).optional(),
    status: z.enum(['Active', 'Blocked']).optional(),
    joinedFrom: z.coerce.date().optional(),
    joinedTo: z.coerce.date().optional(),
    sortBy: z.enum(['name', 'joined']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional(),
  })
  .strip();
