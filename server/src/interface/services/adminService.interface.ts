import type {
  IRecruiterListDTO,
  IRecruiterListItemDTO,
  IUserListItemDTO,
  RecruiterListRequestDTO,
  UsersListRequestDTO,
} from '../../dto/admin.dto.js';

export interface IUsersListResponseDTO {
  users: IUserListItemDTO[];
  total: number;
  totalPages: number;
  page: number;
}

export interface IRecruitersListResponseDTO {
  recruiters: IRecruiterListItemDTO[];
  total: number;
  totalPages: number;
  page: number;
}

export interface IRecruitersResponseDTO {
  recruiters: IRecruiterListDTO[];
  total: number;
  totalPages: number;
  page: number;
}

export interface IAdminService {
  listUsers(filter: UsersListRequestDTO): Promise<IUsersListResponseDTO>;
  blockUser(userId: string): Promise<void>;
  unblockUser(userId: string): Promise<void>;
  listRecruiters(filter: RecruiterListRequestDTO): Promise<IRecruitersListResponseDTO>;
  blockRecruiter(recruiterId: string): Promise<void>;
  unblockRecruiter(recruiterId: string): Promise<void>;
  getPendingRecruiters(filter: RecruiterListRequestDTO): Promise<IRecruitersResponseDTO>;
  approveRecruiter(recruiterId: string): Promise<void>;
  rejectRecruiter(recruiterId: string, reason: string): Promise<void>;
}
