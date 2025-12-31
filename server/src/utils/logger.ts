import winston from 'winston';
import path from 'path';
import { env as environment } from '../config/env.config.js';
import { NODE_ENV } from '../enums/common.enums.js';

const { combine, timestamp, colorize, printf, errors, json } = winston.format;

const env: string = environment.NODE_ENV || 'development';

const logFormat = printf((info) => {
  const { level, timestamp } = info;

  const message =
    info['stack'] ??
    (typeof info.message === 'string' ? info.message : JSON.stringify(info.message));

  return `${timestamp} [${level}]: ${message}`;
});

const transports: winston.transport[] = [];

if (env === NODE_ENV.DEVELOPMENT) {
  transports.push(
    new winston.transports.Console({
      level: 'debug',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), logFormat),
    }),
  );
}

if (env === NODE_ENV.PRODUCTION) {
  transports.push(
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      format: combine(timestamp(), json()),
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log'),
      format: combine(timestamp(), json()),
    }),
  );
}

const logger = winston.createLogger({
  level: env === NODE_ENV.DEVELOPMENT ? 'debug' : 'info',
  exitOnError: false,
  format: combine(errors({ stack: true })),
  transports,
});

export default logger;
