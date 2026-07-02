import { ADMIN_ROUTES } from "../../constants/routes";
import http from "../http";
import type {
  UsersListRequest,
  UsersListApiResponse,
  RecruitersListApiResponse,
  UsersListsRequest,
  RecruitersListsApiResponse,
} from "./interface/adminApi.interface";

export const getAdminUsersApi = async (
  params: UsersListRequest
) => {
  const res = await http.get<UsersListApiResponse>(ADMIN_ROUTES.USER_LIST, {
    params,
  });

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.message || "Failed to fetch users");
  }

  return res.data.data;
};

export const blockUserApi = async (userId: string) => {
  const res = await http.patch(ADMIN_ROUTES.USER_BLOCK(userId));

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to block user");
  }

  return res.data;
};

export const unblockUserApi = async (userId: string) => {
  const res = await http.patch(ADMIN_ROUTES.USER_UNBLOCK(userId));

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to unblock user");
  }

  return res.data;
};

export const getAdminRecruitersApi = async (
  params: UsersListRequest
) => {
  const res = await http.get<RecruitersListApiResponse>(
    ADMIN_ROUTES.RECRUITER_LIST,
    { params }
  );

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.message || "Failed to fetch recruiters");
  }

  return res.data.data;
};

export const blockRecruiterApi = async (recruiterId: string) => {
  const res = await http.patch(
    ADMIN_ROUTES.RECRUITER_BLOCK(recruiterId)
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to block recruiter");
  }

  return res.data;
};

export const unblockRecruiterApi = async (recruiterId: string) => {
  const res = await http.patch(ADMIN_ROUTES.RECRUITER_UNBLOCK(recruiterId));

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to unblock recruiter");
  }

  return res.data;
};

export const getPendingRecruitersApi = async (params: UsersListsRequest) => {
  const res = await http.get<RecruitersListsApiResponse>(
    '/admin/recruiters/pending',
    { params }
  );

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.message || "Failed to fetch pending recruiters");
  }

  return res.data.data;
};

export const approveRecruiterApi = async (id: string) => {
  const res = await http.patch(`/admin/recruiters/approve/${id}`);

  if (!res.data.success) {
    throw new Error(res.data.message || 'Failed to approve recruiter');
  }

  return res.data;
};

export const rejectRecruiterApi = async (id: string, reason: string) => {
  const res = await http.patch(`/admin/recruiters/reject/${id}`, {
    reason,
  });

  if (!res.data.success) {
    throw new Error(res.data.message || 'Failed to reject recruiter');
  }

  return res.data;
};
