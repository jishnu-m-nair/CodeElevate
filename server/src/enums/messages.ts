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
  admin: {
    error: {
      failedBlockUser: 'Failed to block user',
      failedUnblockUser: 'Failed to unblock user',
    },
    success: {
      userBlockSuccess: 'User blocked successful',
      userUnblockSuccess: 'User unblock successful',
      userListSuccess: 'User list fetched successfully',
    },
  },
  user: {
    error: {
      notFound: 'User not found',
      incorrectPassword: 'Current password is incorrect',
      samePassword: 'New password must be different',
      usernameTaken: 'Username already taken',
    },
    success: {
      passwordUpdateSuccess: 'Password updated successfully',
      profileFetched: 'Profile fetched successfully',
      profileUpdated: 'Profile updated successfully',
    },
  },
} as const;

export type Messages = (typeof Messages)[keyof typeof Messages];
