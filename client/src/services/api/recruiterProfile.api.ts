import { RECRUITER_ROUTES } from "../../constants/routes";
import type { RecruiterProfile } from "../../types/recruiterTypes";
import http from "../http";
import type { EditRecruiterProfileRequest } from "./interface/recruiterProfileApi.interface";

export const getRecruiterProfileApi = async (): Promise<RecruiterProfile> => {
  const res = await http.get(RECRUITER_ROUTES.PROFILE);
  console.log('Profile get', res.data)
  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to fetch profile");
  }

  return res.data.data;
};

export const editRecruiterProfileApi = async (data: EditRecruiterProfileRequest) => {
  const res = await http.post(RECRUITER_ROUTES.PROFILE, data);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to update profile");
  }

  return res.data;
};