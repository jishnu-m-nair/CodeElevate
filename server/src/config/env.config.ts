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
} as const;
