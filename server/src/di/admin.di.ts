import AdminController from '../controllers/admin.controller.js';
import UserRepository from '../repositories/user.repository.js';
import AdminService from '../services/admin.service.js';

const userRepo = new UserRepository();
const adminService = new AdminService(userRepo);

export const adminController = new AdminController(adminService);
