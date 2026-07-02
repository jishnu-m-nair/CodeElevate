import type { EditRecruiterProfileRequest } from "./api/interface/recruiterProfileApi.interface";
import { editRecruiterProfileApi, getRecruiterProfileApi } from "./api/recruiterProfile.api";

export const getRecruiterProfileService = async () => {
  return await getRecruiterProfileApi();
};

export const updateRecruiterProfileService = async (
  data: EditRecruiterProfileRequest
) => {
  return await editRecruiterProfileApi(data);
};