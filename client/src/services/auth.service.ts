import {
  forgotPasswordRecruiterApi,
  forgotPasswordUserApi,
  loginAdminApi,
  loginRecruiterApi,
  loginUserApi,
  logoutAdmin,
  logoutRecruiter,
  logoutUser,
  resendRecruiterOtpApi,
  resendUserOtpApi,
  resetPasswordRecruiterApi,
  resetPasswordUserApi,
  signupRecruiter,
  signupUser,
  verifyRecruiterOtpApi,
  verifyUserOtpApi
} from './api/auth.api';
import { clearAuth, setAuth } from '../store/slices/authSlice';
import { clearUserProfile, setUserProfile } from '../store/slices/userSlice';
import type { LoginValues, UserRole } from '../types/authTypes';
import type { AppDispatch } from '../store/store';
import type { LoginData, RecruiterSignupRequest, UserSignupRequest } from './api/interface/authApi.interface';
import { clearRecruiterProfile, setRecruiterProfile } from '../store/slices/recruiterSlice';
import { clearAdminProfile, setAdminProfile } from '../store/slices/adminSlice';
import { ADMIN_ROUTES, AUTH_ROUTES, RECRUITER_ROUTES, USER_ROUTES } from '../constants/routes';

export const loginUserService = async (
  dispatch: AppDispatch,
  values: LoginValues,
) => {
  const data = await loginUserApi(values);
  handleLoginSuccess(dispatch, data);
  return USER_ROUTES.HOME;
};

export const loginRecruiterService = async (
  dispatch: AppDispatch,
  values: LoginValues,
) => {
  const data = await loginRecruiterApi(values);
  handleLoginSuccess(dispatch, data);
  return RECRUITER_ROUTES.DASHBOARD;
};

export const loginAdminService = async (
  dispatch: AppDispatch,
  values: LoginValues,
) => {
  const data = await loginAdminApi(values);
  handleLoginSuccess(dispatch, data);
  return ADMIN_ROUTES.HOME;
};

export const signupUserService = async (
  data: UserSignupRequest
) => {
  const res = await signupUser(data);
  return {
    nextRoute: AUTH_ROUTES.VERIFY_OTP_USER,
    email: res.email,
  };
};

export const signupRecruiterService = async (
  data: RecruiterSignupRequest
) => {
  const res = await signupRecruiter(data);

  return {
    nextRoute: AUTH_ROUTES.VERIFY_OTP_RECRUITER,
    email: res.email,
  };
};

export const verifyOtpService = async (
  dispatch: AppDispatch,
  email: string,
  otp: string,
  role: "user" | "recruiter"
) => {
  const res =
    role === "user"
      ? await verifyUserOtpApi({ email, otp })
      : await verifyRecruiterOtpApi({ email, otp });

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.message || "OTP verification failed");
  }

  const { accessToken, user } = res.data.data;

  localStorage.setItem('accessToken', accessToken);

  dispatch(
    setAuth({
      accessToken,
      role: user.role,
    })
  );

  switch (user.role) {
    case "user":
      dispatch(setUserProfile(user));
      break;

    case "recruiter":
      dispatch(setRecruiterProfile(user));
      break;
  }

  return user.role === "recruiter"
    ? RECRUITER_ROUTES.DASHBOARD
    : USER_ROUTES.HOME;
};

export const resendOtpService = async (
  email: string,
  role: "user" | "recruiter"
) => {
  if (role === "user") {
    await resendUserOtpApi(email);
  } else {
    await resendRecruiterOtpApi(email);
  }
};

export const forgotPasswordService = async (
  email: string,
  role?: UserRole
): Promise<string> => {
  if(!role || role === 'admin') return 'Not eligible for email reset';
  if (role === "user") {
    await forgotPasswordUserApi({ email });
  } else if (role === "recruiter") {
    await forgotPasswordRecruiterApi({ email });
  }

  return "If the email exists, reset link has been sent";
};

export const resetPasswordService = async (
  newPassword: string,
  role: 'user' | 'recruiter',
  token: string,
) => {
  if (role === "user") {
    await resetPasswordUserApi({ token, newPassword });
  } else {
    await resetPasswordRecruiterApi({ token, newPassword });
  }

  return;
};

const handleLoginSuccess = (
  dispatch: AppDispatch,
  data: LoginData
) => {

  localStorage.setItem('accessToken', data.accessToken);

  dispatch(
    setAuth({
      accessToken: data.accessToken,
      role: data.user.role,
    })
  );

  switch (data.user.role) {
    case 'user':
      dispatch(setUserProfile(data.user));
      break;

    case 'recruiter':
      console.log(data.user)
      dispatch(setRecruiterProfile(data.user));
      break;

    case 'admin':
      dispatch(setAdminProfile(data.user));
      break;
  }
};




export const logoutService = async (
  dispatch: AppDispatch,
  role: UserRole
): Promise<string> => {
  try {
    let redirectUrl = '';
    switch (role) {
    case "user":
      await logoutUser();
      break;

    case "recruiter":
      await logoutRecruiter();
      redirectUrl = AUTH_ROUTES.LOGIN_RECRUITER;
      break;

    case "admin":
      await logoutAdmin();
      redirectUrl = AUTH_ROUTES.LOGIN_ADMIN;
      break;
  }
    return redirectUrl !== '' ? redirectUrl : AUTH_ROUTES.LOGIN_USER;
  } catch (error) {
    console.warn("Logout API failed", error);
    return AUTH_ROUTES.LOGIN_USER
  } finally {
    localStorage.removeItem('accessToken');
    dispatch(clearAuth());
    dispatch(clearUserProfile());
    dispatch(clearRecruiterProfile());
    dispatch(clearAdminProfile());
  }
};
