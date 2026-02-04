import type { IUserListItemDTO, UsersListRequestDTO } from '../../dto/admin.dto.js';

export interface IUsersListResponseDTO {
  users: IUserListItemDTO[];
  total: number;
  totalPages: number;
  page: number;
}

export interface IAdminService {
  listUsers(filter: UsersListRequestDTO): Promise<IUsersListResponseDTO>;
  blockUser(userId: string): Promise<void>;
  unblockUser(userId: string): Promise<void>;
}
