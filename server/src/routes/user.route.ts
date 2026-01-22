import { Router } from 'express';
import type { Response, Request } from 'express';
import { authController } from '../di/auth.di.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import {
  emailSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  signupSchemaUser,
} from '../schemas/auth.schema.js';

const router = Router();

router.get('/home', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'home page', data: null });
});

// Auth Routes
router.post('/login', validateBody(loginSchema), authController.loginUser.bind(authController));
router.post(
  '/signup',
  validateBody(signupSchemaUser),
  authController.signupUser.bind(authController),
);
router.post(
  '/verify-otp',
  validateBody(otpSchema),
  authController.verifyUserOtp.bind(authController),
);
router.post(
  '/resend-otp',
  validateBody(emailSchema),
  authController.resendUserOtp.bind(authController),
);
router.post(
  '/forgot-password',
  validateBody(emailSchema),
  authController.forgotPasswordUser.bind(authController),
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  authController.resetPasswordUser.bind(authController),
);
router.post('/refresh', authController.refreshAccessToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export { router as userRouter };
