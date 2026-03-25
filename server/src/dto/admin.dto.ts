import type z from 'zod';
import type { listUsersQuerySchema } from '../schemas/admin.schema.js';

export interface IUserListItemDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  status: 'Active' | 'Blocked';
  joined: string;
}

export type UsersListRequestDTO = z.infer<typeof listUsersQuerySchema>;
