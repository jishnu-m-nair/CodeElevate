import { Router } from 'express';
import type { Response, Request } from 'express';
import { authController } from '../di/auth.di.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import {
  emailSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  signupSchemaRecruiter,
} from '../schemas/auth.schema.js';

const router = Router();

router.get('/home', (_req: Request, res: Response) => {
  res.send('home route');
});

// Auth Routes
router.post(
  '/login',
  validateBody(loginSchema),
  authController.loginRecruiter.bind(authController),
);
router.post(
  '/signup',
  validateBody(signupSchemaRecruiter),
  authController.signupRecruiter.bind(authController),
);
router.post(
  '/verify-otp',
  validateBody(otpSchema),
  authController.verifyRecruiterOtp.bind(authController),
);
router.post(
  '/resend-otp',
  validateBody(emailSchema),
  authController.resendRecruiterOtp.bind(authController),
);
router.post(
  '/forgot-password',
  validateBody(emailSchema),
  authController.forgotPasswordRecruiter.bind(authController),
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  authController.resetPasswordRecruiter.bind(authController),
);
router.post('/refresh', authController.refreshAccessToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export { router as recruiterRouter };
