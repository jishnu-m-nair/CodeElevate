import { Router } from 'express';
import type { Response, Request } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('home route');
});

export default router;
