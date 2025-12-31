import './bootstrap.js';
import express from 'express';
import http from 'http';
import logger from './utils/logger.js';
import { env } from './config/env.config.js';
import router from './routes/user.route.js';
import healthRouter from './routes/health.route.js';

const app = express();
const port: number = env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthRouter);
app.use('/', router);

const server = http.createServer(app);

server.listen(port, () => logger.info(`server started ${env.SERVER_URL}`));

process.on('SIGTERM', async () => {
  logger.warn('SIGTERM received. Shutting down gracefully...');

  server.close(() => {
    logger.info('HTTP server closed');

    process.exit(0);
  });
});
