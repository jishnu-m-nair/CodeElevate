import { Router } from 'express';
import type { Response, Request } from 'express';
import { authController } from '../di/auth.di.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { validateBody } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/home', (_req: Request, res: Response) => {
  res.send('home route');
});

// Auth Routes
router.post('/login', validateBody(loginSchema), authController.loginAdmin.bind(authController));
router.post('/refresh', authController.refreshAccessToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export { router as adminRouter };
