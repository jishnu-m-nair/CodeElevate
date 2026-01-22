export const Messages = {
  auth: {
    error: {
      invalidCredentials: 'Invalid email or password',
      accessDenied: 'Access denied',
      otpInvalid: 'Invalid or expired OTP',
      userNotFound: 'User not found',
      recruiterNotFound: 'Recruiter not found',
      emailAlreadyRegistered: 'Email already registered',
      emailAlreadyVerified: 'Email already verified',
      resetLinkInvalid: 'Invalid or expired reset link',
      passwordResetNotAllowed: 'Password reset not allowed for this account',
      sessionExpired: 'Session expired',
      unauthorized: 'Unauthorized',
      invalidTokenPayload: 'Invalid token payload',
      tokenInvalid: 'Invalid or expired token',
    },

    success: {
      loginSuccess: 'Login successful',
      signupSuccess: 'Signup successful. Please verify your email.',
      emailVerified: 'Email verified successfully',
      otpResent: 'OTP resent successfully',
      resetLinkSent: 'If an account exists, a reset link has been sent.',
      passwordResetSuccess: 'Password reset successfully',
      logoutSuccess: 'Logged out successfully',
      tokenRefreshed: 'Token refreshed',
    },
  },
} as const;

export type Messages = (typeof Messages)[keyof typeof Messages];
