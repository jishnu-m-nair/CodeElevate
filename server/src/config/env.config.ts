function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
export const env = {
  PORT: Number(process.env['PORT']),
  MONGO_URL: required('MONGO_URL'),
  NODE_ENV: process.env['NODE_ENV'] ?? 'development',
  SESSION_SECRET: process.env['SESSION_SECRET'],
  SESSION_MAX_AGE: Number(process.env['SESSION_MAX_AGE']),
  SERVER_URL: process.env['SERVER_URL'] ?? 'http://localhost:3000',
  SMTP_HOST: process.env['SMTP_HOST'],
  SMTP_PORT: Number(process.env['SMTP_PORT']),
  SMTP_USER: process.env['SMTP_USER'],
  SMTP_PASS: process.env['SMTP_PASS'],
  JWT_ACCESS_SECRET: process.env['JWT_ACCESS_SECRET'],
  JWT_REFRESH_SECRET: process.env['JWT_REFRESH_SECRET'],
  FRONTEND_URL: process.env['FRONTEND_URL'],
  FRONTEND_URL2: process.env['FRONTEND_URL2'],
  REDIS_HOST: process.env['REDIS_HOST'],
  REDIS_PORT: Number(process.env['REDIS_PORT']),
  REDIS_PASSWORD: process.env['REDIS_PASSWORD'],
  RESEND_OTP_MAX_AGE: Number(process.env['RESEND_OTP_MAX_AGE']),
  OTP_TTL_SECONDS: Number(process.env['OTP_TTL_SECONDS']),
  FORGOT_PASSWORD_TTL_SECONDS: Number(process.env['FORGOT_PASSWORD_TTL_SECONDS']),
  REFRESH_TOKEN_TTL_SECONDS: Number(process.env['REFRESH_TOKEN_TTL_SECONDS']),
  REFRESH_TOKEN_MAX_AGE: Number(process.env['REFRESH_TOKEN_MAX_AGE']),
} as const;
