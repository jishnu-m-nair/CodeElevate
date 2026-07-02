export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  HOME: '/admin/home',
  USER_LIST: '/admin/users',
  USER_BLOCK: (id: string) => `/admin/users/${id}/block`,
  USER_UNBLOCK: (id: string) => `/admin/users/${id}/unblock`,
  RECRUITER_LIST: 'admin/recruiters',
  RECRUITER_BLOCK: (id: string) => `/admin/recruiters/${id}/block`,
  RECRUITER_UNBLOCK: (id: string) => `/admin/recruiters/${id}/unblock`,
} as const;

export const RECRUITER_ROUTES = {
  DASHBOARD: '/recruiter/dashboard',
  PROFILE: '/recruiter/profile',
  JOB_POSTINGS: '/recruiter/jobs',
  JOBS: '/recruiter/jobs',
  NEW_JOB: '/recruiter/job',
} as const;

export const USER_ROUTES = {
  HOME: 'home',
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/change-password',
} as const;

export const AUTH_ROUTES = {
  LOGIN_USER: '/login',
  LOGIN_RECRUITER: '/recruiter/login',
  LOGIN_ADMIN: '/admin/login',
  SIGNUP_USER: '/signup',
  SIGNUP_RECRUITER: '/recruiter/signup',
  VERIFY_OTP_USER: '/verify-otp',
  VERIFY_OTP_RECRUITER: '/recruiter/verify-otp',
  RESEND_OTP_USER: '/resend-otp',
  RESEND_OTP_RECRUITER: '/recruiter/resend-otp',
  FORGOT_PASSWORD_USER: 'forgot-password',
  FORGOT_PASSWORD_RECRUITER: 'recruiter/forgot-password',
  RESET_PASSWORD_USER: 'reset-password',
  RESET_PASSWORD_RECRUITER: 'recruiter/reset-password',
  LOGOUT_USER: 'logout',
  LOGOUT_RECRUITER: 'recruiter/logout',
  LOGOUT_ADMIN: 'admin/logout',
} as const;