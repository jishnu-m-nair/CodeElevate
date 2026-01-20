import { Router } from 'express';
import { userRouter } from './user.route.js';
import { recruiterRouter } from './recruiter.route.js';
import { adminRouter } from './admin.route.js';
import { healthRouter } from './health.route.js';

const router = Router();

router.use('/', userRouter);
router.use('/recruiter', recruiterRouter);
router.use('/admin', adminRouter);
router.use('/server', healthRouter);

export default router;
