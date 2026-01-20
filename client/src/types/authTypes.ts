export type UserRole = "user" | "recruiter" | "admin";

export interface BaseAuthUser {
  id: string;
  email: string;
  role: UserRole;
  isVerified?: boolean;
}

export interface AuthUserData extends BaseAuthUser {
  role: "user";
  name: string;
  isVerified: boolean;
}

export interface AuthRecruiterData extends BaseAuthUser {
  role: "recruiter";
  companyName: string;
  isVerified: boolean;
}

export interface AuthAdminData extends BaseAuthUser {
  role: "admin";
}

export type AuthUser = AuthUserData | AuthRecruiterData | AuthAdminData;


export interface LoginValues {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
