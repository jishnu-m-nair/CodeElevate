import http from "../http";
import type {
  UsersListRequest,
  UsersListApiResponse,
} from "./interface/adminApi.interface";

export const getAdminUsersApi = async (
  params: UsersListRequest
) => {
  const res = await http.get<UsersListApiResponse>("/admin/users", {
    params,
  });

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.message || "Failed to fetch users");
  }

  return res.data.data;
};

export const blockUserApi = async (userId: string) => {
  const res = await http.patch(
    `/admin/users/${userId}/block`
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to block user");
  }

  return res.data;
};

export const unblockUserApi = async (userId: string) => {
  const res = await http.patch(
    `/admin/users/${userId}/unblock`
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to unblock user");
  }

  return res.data;
};
