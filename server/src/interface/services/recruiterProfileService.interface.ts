import type { IEditRecruiterProfileDTO, IRecruiterProfileDTO } from '../../dto/recruiter.dto.js';

export interface IRecruiterProfileService {
  viewProfile(recruiterId: string): Promise<IRecruiterProfileDTO>;
  editProfile(recruiterId: string, data: IEditRecruiterProfileDTO): Promise<IRecruiterProfileDTO>;
}
