import mongoose from 'mongoose';
import { env } from './env.config.js';
import logger from '../utils/logger.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URL);

    logger.info('MongoDB connected successfully');

    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error', error);
    });
  } catch (error) {
    logger.error('MongoDB connection failed', error);
    process.exit(1);
  }
};
