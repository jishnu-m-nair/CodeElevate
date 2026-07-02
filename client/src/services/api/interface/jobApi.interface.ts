export interface CreateJobRequest {
  title: string;
  role: string;
  skills: string;

  totalExperienceMonths: number;

  rawMinSalary: number;
  rawMaxSalary: number;

  jobType: string;
  location: string;
  lastDate: string;
  description: string;
}

export interface JobResponse {
  id: string;
  title: string;
  role: string;
  skills: string;

  totalExperienceMonths: number;

  rawMinSalary: number;
  rawMaxSalary: number;

  jobType: string;
  location: string;
  lastDate: string;
  description: string;

  createdAt: string;
}