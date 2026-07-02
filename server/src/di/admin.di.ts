import AdminController from '../controllers/admin.controller.js';
import RecruiterRepository from '../repositories/recruiter.repository.js';
import UserRepository from '../repositories/user.repository.js';
import AdminService from '../services/admin.service.js';

const userRepo = new UserRepository();
const recruiterRepo = new RecruiterRepository();
const adminService = new AdminService(userRepo, recruiterRepo);

export const adminController = new AdminController(adminService);
