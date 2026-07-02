import type { AuthProvider } from '../interface/common/common.interface.js';

export interface IRecruiterProfileDTO {
  id: string;
  companyName: string;
  email: string;
  phone?: string;
  status: string;
  companyWebsite: string;
  linkedInUrl?: string;
  bio?: string;
  Providers: AuthProvider[];
}

export interface IEditRecruiterProfileDTO {
  companyName: string;
  phone?: string;
  companyWebsite: string;
  linkedInUrl?: string;
  bio?: string;
}
