import { env } from '../config/env.config.js';
import transporter from '../config/nodemailer.config.js';

export const sendOtpMail = async (to: string, otp: string): Promise<void> => {
  await transporter.sendMail({
    from: `"CodeElevate" <${env.SMTP_USER}>`,
    to,
    subject: 'Verify your email - CodeElevate',
    html: `
      <div style="font-family: Arial, sans-serif">
        <h2>Email Verification</h2>
        <p>Your OTP for verification is:</p>
        <h1 style="letter-spacing: 4px">${otp}</h1>
        <p>This OTP is valid for 2 minutes.</p>
      </div>
    `,
  });
};
