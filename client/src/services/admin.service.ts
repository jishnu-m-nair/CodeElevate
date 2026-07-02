import type { UsersListRequest, UsersListsRequest } from "./api/interface/adminApi.interface";
import { approveRecruiterApi, blockRecruiterApi, blockUserApi, getAdminRecruitersApi, getAdminUsersApi, getPendingRecruitersApi, rejectRecruiterApi, unblockRecruiterApi, unblockUserApi } from "./api/admin.api";

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

export const fetchPendingRecruitersService = async (
  params: UsersListsRequest
) => {
  const response = await getPendingRecruitersApi(params);

  const formatted = response.recruiters.map((r) => ({
    id: r.id,
    companyName: r.companyName,
    email: r.email,
    companyWebsite: r.companyWebsite || '',
    date: formatDate(r.joined),
    status: r.status,
  }));

  return {
    ...response,
    recruiters: formatted,
  };
};

export const approveRecruiterService = async (id: string) => {
  await approveRecruiterApi(id);
};

export const rejectRecruiterService = async (
  id: string,
  reason: string
) => {
  await rejectRecruiterApi(id, reason);
};

export const fetchAdminRecruitersService = async (
  params: UsersListRequest
) => {
  const response = await getAdminRecruitersApi(params);

  const formattedRecruiters = response.recruiters.map((recruiter) => ({
    ...recruiter,
    joined: formatDate(recruiter.joined),
  }));

  return {
    ...response,
    users: formattedRecruiters,
  };
};

export const blockRecruiterService = async (recruiterId: string) => {
  await blockRecruiterApi(recruiterId);
};

export const unblockRecruiterService = async (recruiterId: string) => {
  await unblockRecruiterApi(recruiterId);
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('en-GB').format(date);
};
