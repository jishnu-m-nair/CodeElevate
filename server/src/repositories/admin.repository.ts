import type { IAdminDocument } from '../interface/models/admin.interface.js';
import type { IAdminRepository } from '../interface/repositories/adminRepo.interface.js';
import { AdminModel } from '../models/admin.model.js';
import { BaseRepository } from './base.repository.js';

class AdminRepository extends BaseRepository<IAdminDocument> implements IAdminRepository {
  constructor() {
    super(AdminModel);
  }

  findByEmail(email: string): Promise<IAdminDocument | null> {
    return this.findOne({ email });
  }
}

export default AdminRepository;
