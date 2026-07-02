import type z from 'zod';
import type {
  listRecruitersQuerySchema,
  listUsersQuerySchema,
  PendingRecruitersQuerySchema,
} from '../schemas/admin.schema.js';

export interface IUserListItemDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  status: 'Active' | 'Blocked';
  joined: string;
}

export interface IRecruiterListItemDTO {
  id: string;
  companyName: string;
  companyWebsite: string;
  email: string;
  status: 'Active' | 'Blocked';
  joined: string;
}

export interface IRecruiterListDTO {
  id: string;
  companyName: string;
  companyWebsite: string;
  email: string;
  status: 'pending' | 'rejected' | 'approved';
  joined: string;
}

export type UsersListRequestDTO = z.infer<typeof listUsersQuerySchema>;
export type RecruiterListRequestDTO = z.infer<typeof listRecruitersQuerySchema>;

export type PendingRecruiterRequestDTO = z.infer<typeof PendingRecruitersQuerySchema>;
