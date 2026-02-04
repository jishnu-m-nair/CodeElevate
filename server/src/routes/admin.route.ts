import { Router } from 'express';
import type { Response, Request } from 'express';
import { authController } from '../di/auth.di.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { adminController } from '../di/admin.di.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/home', (_req: Request, res: Response) => {
  res.send('home route');
});

// Auth Routes
router.post('/login', validateBody(loginSchema), authController.loginAdmin.bind(authController));
router.post('/refresh', authController.refreshAccessToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

//User Routes
router.get(
  '/users',
  authenticate,
  authorize('admin'),
  adminController.listUsers.bind(adminController),
);
router.patch('/users/:id/block', adminController.blockUser.bind(adminController));
router.patch('/users/:id/unblock', adminController.unblockUser.bind(adminController));

export { router as adminRouter };
