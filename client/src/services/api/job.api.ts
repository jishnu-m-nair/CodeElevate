import { RECRUITER_ROUTES } from "../../constants/routes";
import http from "../http";
import type { CreateJobRequest, JobResponse } from "./interface/jobApi.interface";


// CREATE JOB
export const createJobApi = async (
  data: CreateJobRequest
): Promise<JobResponse> => {
  const res = await http.post(RECRUITER_ROUTES.NEW_JOB, data);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to create job");
  }

  return res.data.data;
};

// GET ALL JOBS (recruiter jobs)
export const getRecruiterJobsApi = async (): Promise<JobResponse[]> => {
  const res = await http.get(RECRUITER_ROUTES.JOBS);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to fetch jobs");
  }

  return res.data.data;
};

// GET SINGLE JOB
export const getJobByIdApi = async (jobId: string): Promise<JobResponse> => {
  const res = await http.get(`${RECRUITER_ROUTES.JOBS}/${jobId}`);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to fetch job");
  }

  return res.data.data;
};

// UPDATE JOB
export const updateJobApi = async (
  jobId: string,
  data: CreateJobRequest
): Promise<JobResponse> => {
  const res = await http.put(`${RECRUITER_ROUTES.JOBS}/${jobId}`, data);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to update job");
  }

  return res.data.data;
};

// DELETE JOB
export const deleteJobApi = async (jobId: string) => {
  const res = await http.delete(`${RECRUITER_ROUTES.JOBS}/${jobId}`);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to delete job");
  }

  return res.data;
};