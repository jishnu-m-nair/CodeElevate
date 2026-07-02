import type { IUserDocument } from '../interface/models/user.interface.js';
import type {
  IRecruiterListDTO,
  IRecruiterListItemDTO,
  IUserListItemDTO,
} from '../dto/admin.dto.js';
import type { IRecruiterDocument } from '../interface/models/recruiter.interface.js';

export const toUserListItemDTO = (user: IUserDocument): IUserListItemDTO => ({
  id: user._id.toString(),
  name: user.name,
  username: user.username,
  email: user.email,
  status: user.isBlocked ? 'Blocked' : 'Active',
  joined: user.createdAt.toISOString(),
});

export const toRecruiterListItemDTO = (recruiter: IRecruiterDocument): IRecruiterListItemDTO => ({
  id: recruiter._id.toString(),
  companyName: recruiter.companyName,
  companyWebsite: recruiter.companyWebsite,
  email: recruiter.email,
  status: recruiter.isBlocked ? 'Blocked' : 'Active',
  joined: recruiter.createdAt.toISOString(),
});

export const toRecruiterListDTO = (recruiter: IRecruiterDocument): IRecruiterListDTO => ({
  id: recruiter._id.toString(),
  companyName: recruiter.companyName,
  companyWebsite: recruiter.companyWebsite,
  email: recruiter.email,
  status: recruiter.status,
  joined: recruiter.createdAt.toISOString(),
});
