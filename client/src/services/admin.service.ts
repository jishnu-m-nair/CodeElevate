import type { UsersListRequest } from "./api/interface/adminApi.interface";
import { blockUserApi, getAdminUsersApi, unblockUserApi } from "./api/admin.api";

export const fetchAdminUsersService = async (
  params: UsersListRequest
) => {
  const response = await getAdminUsersApi(params);

  const formattedUsers = response.users.map((user) => ({
    ...user,
    joined: formatDate(user.joined)
  }));

  return {
    ...response,
    users: formattedUsers,
  };
};

export const blockUserService = async (userId: string) => {
  await blockUserApi(userId);
};

export const unblockUserService = async (userId: string) => {
  await unblockUserApi(userId);
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('en-GB').format(date);
};
