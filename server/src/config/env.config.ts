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
} as const;
