import type { CreateJobRequest } from "./api/interface/jobApi.interface";
import {
  createJobApi,
  deleteJobApi,
  getJobByIdApi,
  getRecruiterJobsApi,
  updateJobApi,
} from "./api/job.api";

// CREATE
export const createJobService = async (data: CreateJobRequest) => {
  return await createJobApi(data);
};

// GET ALL
export const getRecruiterJobsService = async () => {
  return await getRecruiterJobsApi();
};

// GET ONE
export const getJobByIdService = async (jobId: string) => {
  return await getJobByIdApi(jobId);
};

// UPDATE
export const updateJobService = async (
  jobId: string,
  data: CreateJobRequest
) => {
  return await updateJobApi(jobId, data);
};

// DELETE
export const deleteJobService = async (jobId: string) => {
  return await deleteJobApi(jobId);
};