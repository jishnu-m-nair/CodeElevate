import http from "../http";
import type {
  UserProfileApiResponse,
  EditProfileRequest,
  ChangePasswordRequest,
  EditProfileApiResponse,
  BasicApiResponse,
} from "./interface/userProfileApi.interface";


export const getProfileApi = async () => {
  const res = await http.get<UserProfileApiResponse>("/profile");

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.message || "Failed to fetch profile");
  }

  return res.data.data;
};

export const editProfileApi = async (data: EditProfileRequest) => {
  const res = await http.post<EditProfileApiResponse>("/profile", data);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to update profile");
  }

  return {
    user: res.data.data,
    message: res.data.message
  };
};

export const changePasswordApi = async (data: ChangePasswordRequest) => {
  const res = await http.post<BasicApiResponse>("/change-password", data);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to change password");
  }

  return res.data;
};