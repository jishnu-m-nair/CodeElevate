import type { IEditRecruiterProfileDTO, IRecruiterProfileDTO } from '../dto/recruiter.dto.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';
import { CustomError } from '../errors/CustomError.js';
import type { IRecruiterRepository } from '../interface/repositories/recruiterRepo.interface.js';
import type { IRecruiterProfileService } from '../interface/services/recruiterProfileService.interface.js';
import { toRecruiterProfileDTO } from '../mappers/recruiter.mapper.js';

class RecruiterProfileService implements IRecruiterProfileService {
  constructor(private _recruiterRepo: IRecruiterRepository) {}

  async viewProfile(recruiterId: string): Promise<IRecruiterProfileDTO> {
    const recruiter = await this._recruiterRepo.findById(recruiterId);
    if (!recruiter) throw new CustomError(Messages.recruiter.error.notFound, StatusCode.NOT_FOUND);

    return toRecruiterProfileDTO(recruiter);
  }
  async editProfile(
    recruiterId: string,
    data: IEditRecruiterProfileDTO,
  ): Promise<IRecruiterProfileDTO> {
    const { companyName, companyWebsite, linkedInUrl, phone, bio } = data;

    const recruiter = await this._recruiterRepo.findById(recruiterId);
    if (!recruiter) throw new CustomError(Messages.recruiter.error.notFound, StatusCode.NOT_FOUND);

    const updateData: Partial<IEditRecruiterProfileDTO> = {};
    const unsetData: Partial<Record<keyof IEditRecruiterProfileDTO, '' | 1>> = {};

    if (companyName !== undefined) updateData.companyName = companyName;
    if (companyWebsite !== undefined) updateData.companyWebsite = companyWebsite;

    if (linkedInUrl !== undefined) {
      if (linkedInUrl === '') {
        unsetData.linkedInUrl = '';
      } else {
        updateData.linkedInUrl = linkedInUrl;
      }
    }

    if (phone !== undefined) {
      if (phone === '') {
        unsetData.phone = '';
      } else {
        updateData.phone = phone;
      }
    }

    if (bio !== undefined) {
      if (bio === '') {
        unsetData.bio = '';
      } else {
        updateData.bio = bio;
      }
    }

    const updated = await this._recruiterRepo.updateProfile(recruiterId, {
      set: updateData,
      unset: unsetData,
    });
    if (!updated) throw new CustomError(Messages.recruiter.error.notUpdated, StatusCode.NOT_FOUND);
    return toRecruiterProfileDTO(updated);
  }
}

export default RecruiterProfileService;
