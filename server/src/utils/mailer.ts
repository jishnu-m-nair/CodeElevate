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
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `,
  });
};

export const sendResetPasswordMail = async (
  to: string,
  token: string,
  role: 'recruiter' | 'user',
): Promise<void> => {
  const roleUrl = role === 'recruiter' ? 'recruiter/reset-password' : 'reset-password';
  const resetUrl = `${env.FRONTEND_URL}/${roleUrl}?token=${token}&role=${role}`;

  await transporter.sendMail({
    from: `"CodeElevate" <${env.SMTP_USER}>`,
    to,
    subject: 'Reset your password - CodeElevate',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password.</p>

        <p>
          Click the button below to reset your password:
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px">
          This link will expire in <b>10 minutes</b>.
        </p>

        <p>If you did not request this, you can safely ignore this email.</p>

        <hr />
        <p style="font-size: 12px; color: #666">
          CodeElevate Team
        </p>
      </div>
    `,
  });
};
