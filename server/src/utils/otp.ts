import crypto from 'crypto';

export function generateOtp(digits: number): string {
  if (digits <= 0) return '';
  const max = Math.pow(10, digits);

  const otp = crypto.randomInt(0, max);

  return otp.toString().padStart(digits, '0');
}
