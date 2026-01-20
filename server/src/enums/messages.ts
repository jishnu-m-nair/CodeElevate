enum Messages {
  SAVE_SESSION_ERROR = 'Error saving session',
  GENERATE_OTP_ERROR = "Couldn't generate OTP",
  SESSION_EXPIRED = 'Session expired. Please try again.',
  OTP_EXPIRED = 'OTP has expired. Please request a new one.',
  ALL_FIELDS_REQUIRED = 'All fields are required',
  INVALID_OTP = 'Invalid OTP',
  INVALID_TOKEN = 'Invalid Token',
  OTP_SENT = `OTP send to Email for Verification`,
  ACCOUNT_CREATED = 'Account created successfully!',
  NO_REFRESHTOKEN = 'No refresh token provided',
  REFRESHTOKEN_EXP = 'Refresh token expired',
  RECRUITER_NOT_FOUND = 'Recruiter not found',
  USER_NOT_FOUND = 'User not found',
  BLOCKED = 'Blocked by Admin',
  EMAIL_PASSWORD_REQUIRED = 'Email and Password are required',
  TOKEN_REQUIRED = 'Token is required',
  PASSWORD_RESET_LINK = 'Password reset link sent to your email',
  PASSWORD_RESET_SUCCESS = 'Password Reset Successful',
  AUTHENTICATION_REQUIRED = 'Authentication required',
  TOKEN_NOT_VALID = 'Token is not valid',
  INVALID_PAYLOAD = 'Token payload is invalid',

  LOGIN_SUCCESS = 'Login successful',
  USER_REGISTER_SUCCESS = 'User registered. Please verify your email.',
  USER_EMAIL_VERIFIED = 'Email verified successfully',
  RESEND_OTP_SENT = 'OTP resent successfully',
  USER_LOGOUT = 'Logged out successfully',

  USER_ID_MISSING = 'User ID is missing',
  RECRUITER_ID_MISSING = 'Recruiter ID is missing',
  ADMIN_ID_MISSING = 'Admin id not found>',

  PAYMENT_SUCCESS = 'Payment processed successfully',
  PAYMENT_FAILED = 'Payment processing failed',

  UPDATE_USER_STATUS = 'User block/unblock status updated successfully.',
  UPDATE_RECRUITER_STATUS = 'Recruiter block/unblock status updated successfully.',
}

export default Messages;
