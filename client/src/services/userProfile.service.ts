import {
  getProfileApi,
  editProfileApi,
  changePasswordApi,
} from "./api/userProfile.api";

import type {
  EditProfileRequest,
  ChangePasswordRequest,
} from "./api/interface/userProfileApi.interface";

export const fetchProfileService = async () => {
  return await getProfileApi();
}

export const updateProfileService = async (data: EditProfileRequest) => {
  return await editProfileApi(data);
};

export const updatePasswordService = async (data: ChangePasswordRequest) => {
  await changePasswordApi(data);
};