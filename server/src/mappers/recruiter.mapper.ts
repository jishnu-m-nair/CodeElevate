import type { IRecruiterProfileDTO } from '../dto/recruiter.dto.js';
import type { IRecruiterDocument } from '../interface/models/recruiter.interface.js';

export const toRecruiterProfileDTO = (recruiter: IRecruiterDocument): IRecruiterProfileDTO => ({
  id: recruiter._id.toString(),
  companyName: recruiter.companyName,
  companyWebsite: recruiter.companyWebsite,
  email: recruiter.email,
  status: recruiter.status,
  Providers: recruiter.providers,
  ...(recruiter.phone && { phone: recruiter.phone }),
  ...(recruiter.linkedInUrl && { linkedInUrl: recruiter.linkedInUrl }),
  ...(recruiter.bio && { bio: recruiter.bio }),
});
