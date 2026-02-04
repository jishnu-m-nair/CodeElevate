import type { ApiResponse } from "../../../types/apiResponse";

export type UserStatus = "Active" | "Blocked";

export interface AdminUserListItem {
  id: string;
  name: string;
  username: string;
  email: string;
  status: UserStatus;
  joined: string;
}

export interface UsersListRequest {
  search?: string;
  status?: UserStatus;
  joinedFrom?: string;
  joinedTo?: string;
  sortBy?: "name" | "joined";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface UsersListResponse {
  users: AdminUserListItem[];
  total: number;
  totalPages: number;
  page: number;
}

export type UsersListApiResponse = ApiResponse<UsersListResponse>;
