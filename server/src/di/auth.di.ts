import AuthController from '../controllers/auth.controller.js';
import AdminRepository from '../repositories/admin.repository.js';
import RecruiterRepository from '../repositories/recruiter.repository.js';
import UserRepository from '../repositories/user.repository.js';
import AuthService from '../services/auth.service.js';

const userRepo = new UserRepository();
const adminRepo = new AdminRepository();
const recruiterRepo = new RecruiterRepository();

const authService = new AuthService(userRepo, recruiterRepo, adminRepo);

export const authController = new AuthController(authService);
