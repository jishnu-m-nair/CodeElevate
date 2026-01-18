import { Router } from 'express';
import type { Response, Request } from 'express';
import { authController } from '../di/auth.di.js';

const router = Router();

router.get('/home', (_req: Request, res: Response) => {
  res.send('home route');
});

// Auth Routes
router.post('/login', authController.loginRecruiter.bind(authController));
router.post('/signup', authController.signupRecruiter.bind(authController));
router.post('/verify-otp', authController.verifyRecruiterOtp.bind(authController));
router.post('/resend-otp', authController.resendRecruiterOtp.bind(authController));
router.post('/forgot-password', authController.forgotPasswordRecruiter.bind(authController));
router.post('/reset-password', authController.resetPasswordRecruiter.bind(authController));
router.post('/refresh', authController.refreshAccessToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export { router as recruiterRouter };
