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

export interface UsersListsRequest {
  search?: string;
  status?: 'pending' | 'approved' | 'rejected';
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

export interface AdminRecruiterListItem {
  id: string;
  companyName: string;
  email: string;
  companyWebsite?: string;
  status: 'Active' | 'Blocked';
  joined: string;
}

export interface AdminRecruitersListItem {
  id: string;
  companyName: string;
  email: string;
  companyWebsite?: string;
  status: 'approved' | 'pending' | 'rejected';
  joined: string;
}

export interface RecruitersListResponse {
  recruiters: AdminRecruiterListItem[];
  total: number;
  totalPages: number;
  page: number;
}

export interface RecruitersListsResponse {
  recruiters: AdminRecruitersListItem[];
  total: number;
  totalPages: number;
  page: number;
}

export type RecruitersListApiResponse = ApiResponse<RecruitersListResponse>;

export type RecruitersListsApiResponse = ApiResponse<RecruitersListsResponse>;

export type UsersListApiResponse = ApiResponse<UsersListResponse>;
