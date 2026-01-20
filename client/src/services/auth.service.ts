import {
  login,
  resendRecruiterOtpApi,
  resendUserOtpApi,
  signupRecruiter,
  signupUser,
  verifyRecruiterOtpApi,
  verifyUserOtpApi
} from './api/auth.api';
import { setAuth } from '../store/slices/authSlice';
import { setUserProfile } from '../store/slices/userSlice';
import type { LoginValues } from '../types/authTypes';
import type { AppDispatch } from '../store/store';
import type { RecruiterSignupRequest, UserSignupRequest } from './api/interface/authApi.interface';

export const loginUserService = async (
  dispatch: AppDispatch,
  values: LoginValues,
) => loginBase(dispatch, values, "/home");

export const loginRecruiterService = async (
  dispatch: AppDispatch,
  values: LoginValues,
) => loginBase(dispatch, values, "/recruiter/dashboard");

export const loginAdminService = async (
  dispatch: AppDispatch,
  values: LoginValues,
) => loginBase(dispatch, values, "/admin");

export const signupUserService = async (
  data: UserSignupRequest
) => {
  const res = await signupUser(data);
  return {
    nextRoute: "/verify-otp",
    email: res.email,
  };
};

export const signupRecruiterService = async (
  data: RecruiterSignupRequest
) => {
  const res = await signupRecruiter(data);

  return {
    nextRoute: "/recruiter/verify-otp",
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

  dispatch(
    setAuth({
      accessToken,
      role: user.role,
    })
  );

  dispatch(setUserProfile(user));

  return user.role === "recruiter"
    ? "/recruiter/dashboard"
    : "/home";
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


const loginBase = async (
  dispatch: AppDispatch,
  values: LoginValues,
  redirect: string
) => {
  const data = await login(values);

  dispatch(
    setAuth({
      accessToken: data.accessToken,
      role: data.user.role,
    })
  );

  dispatch(setUserProfile(data.user));

  return redirect;
};

