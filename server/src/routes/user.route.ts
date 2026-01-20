import { Router } from 'express';
import type { Response, Request } from 'express';
import { authController } from '../di/auth.di.js';

const router = Router();

router.get('/home', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'home page', data: null });
});

// Auth Routes
router.post('/login', authController.loginUser.bind(authController));
router.post('/signup', authController.signupUser.bind(authController));
router.post('/verify-otp', authController.verifyUserOtp.bind(authController));
router.post('/resend-otp', authController.resendUserOtp.bind(authController));
router.post('/forgot-password', authController.forgotPasswordUser.bind(authController));
router.post('/reset-password', authController.resetPasswordUser.bind(authController));
router.post('/refresh', authController.refreshAccessToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export { router as userRouter };
