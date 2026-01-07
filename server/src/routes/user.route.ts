import { Router } from 'express';
import type { Response, Request } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthService from '../services/auth.service.js';
import AuthUserRepository from '../repositories/authUser.repository.js';
import UserRepository from '../repositories/user.repository.js';

const authUserRepo = new AuthUserRepository();
const userRepo = new UserRepository();
const authService = new AuthService(authUserRepo, userRepo);
const authController = new AuthController(authService);

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('home route');
});
router.post('/register', authController.registerWithEmail.bind(authController));
router.post('/verify-otp', authController.verifyEmailOtp.bind(authController));
router.post('/login', authController.userLogin.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export default router;
