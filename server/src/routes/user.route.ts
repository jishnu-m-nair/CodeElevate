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
import { userProfileController } from '../di/userProfile.di.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { changePasswordSchema, updateProfileSchema } from '../schemas/userProfile.schema.js';
import { Users } from '../enums/common.enums.js';

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
router.post('/google-login', authController.googleUserLogin.bind(authController));
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

//Profile
router.get(
  '/profile',
  authenticate,
  authorize(Users.USER),
  userProfileController.viewProfile.bind(userProfileController),
);
router.post(
  '/profile',
  authenticate,
  authorize(Users.USER),
  validateBody(updateProfileSchema),
  userProfileController.editProfile.bind(userProfileController),
);
router.post(
  '/change-password',
  authenticate,
  authorize(Users.USER),
  validateBody(changePasswordSchema),
  userProfileController.changePassword.bind(userProfileController),
);

export { router as userRouter };
