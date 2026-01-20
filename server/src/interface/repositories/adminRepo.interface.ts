import type { IAdminDocument } from '../models/admin.interface.js';

export interface IAdminRepository {
  findByEmail(email: string): Promise<IAdminDocument | null>;
}
