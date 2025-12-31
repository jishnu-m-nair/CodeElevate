import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import logger from './utils/logger.js';
import { env } from './config/env.config.js';
import { connectDatabase } from './config/db.config.js';

const port: number = env.PORT || 3000;

const startServer = async () => {
  await connectDatabase();

  const server = http.createServer(app);

  server.listen(port, () => logger.info(`Server started at ${env.SERVER_URL}`));

  const shutdown = async () => {
    logger.warn('SIGTERM/SIGINT received. Shutting down gracefully...');
    server.close(async () => {
      logger.info('HTTP server closed');

      try {
        await mongoose.connection.close(false);
        logger.info('MongoDB connection closed');
      } catch (error) {
        logger.error('Error closing MongoDB connection', error);
      }

      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
