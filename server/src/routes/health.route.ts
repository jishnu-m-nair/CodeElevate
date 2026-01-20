import { Router } from 'express';
import type { Response, Request } from 'express';
import { env } from '../config/env.config.js';
import { NODE_ENV } from '../enums/common.enums.js';

const healthRouter = Router();

interface HealthResponse {
  status: 'ok';
  uptime: number;
  memory?: {
    rss: number;
    heapUsed: number;
    heapTotal: number;
  };
}

healthRouter.get('/health', (_req: Request, res: Response) => {
  const response: HealthResponse = {
    status: 'ok',
    uptime: Math.floor(process.uptime()),
  };

  if (env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
    response.memory = {
      rss: process.memoryUsage().rss / 1024 / 1024,
      heapUsed: process.memoryUsage().heapUsed / 1024 / 1024,
      heapTotal: process.memoryUsage().heapTotal / 1024 / 1024,
    };
  }

  res.status(200).json(response);
});

export { healthRouter };
