import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AdminUserListItem } from '../../services/api/interface/adminApi.interface';
import { fetchAdminUsersService } from '../../services/admin.service';

const PAGE_SIZE = 10;

export function useAdminUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(() => {
    const p = Number(searchParams.get('page'));
    return p > 0 ? p : 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState(
    searchParams.get('search') ?? ''
  );
  const [status, setStatus] = useState<'Active' | 'Blocked' | undefined>(undefined);
  const [joinedFrom, setJoinedFrom] = useState<string | null>(
    searchParams.get('joinedFrom')
  );

  const [joinedTo, setJoinedTo] = useState<string | null>(
    searchParams.get('joinedTo')
  );

  const [sort, setSort] = useState<{
    key: 'name' | 'joined';
    order: 'asc' | 'desc';
  }>(() => ({
    key: (searchParams.get('sortBy') as 'name' | 'joined') ?? 'joined',
    order: (searchParams.get('sortOrder') as 'asc' | 'desc') ?? 'desc',
  }));

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchAdminUsersService({
        search: search || undefined,
        status: status || undefined,
        joinedFrom: joinedFrom || undefined,
        joinedTo: joinedTo || undefined,
        sortBy: sort.key,
        sortOrder: sort.order,
        page,
        limit: PAGE_SIZE,
      });

      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setIsLoading(false);
    }
  }, [search, status, joinedFrom, joinedTo, sort, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (page > 1) params.page = String(page);
    if (search) params.search = search;
    if (status) params.status = status;
    if (joinedFrom) params.joinedFrom = joinedFrom;
    if (joinedTo) params.joinedTo = joinedTo;

    params.sortBy = sort.key;
    params.sortOrder = sort.order;

    setSearchParams(params, { replace: true });
  }, [
    page,
    search,
    status,
    joinedFrom,
    joinedTo,
    sort,
    setSearchParams,
  ]);

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    const searchFromUrl = searchParams.get('search') ?? '';
    const statusFromUrl = searchParams.get('status');
    const joinedFromUrl = searchParams.get('joinedFrom');
    const joinedToUrl = searchParams.get('joinedTo');

    const sortBy =
      (searchParams.get('sortBy') as 'name' | 'joined') ?? 'joined';
    const sortOrder =
      (searchParams.get('sortOrder') as 'asc' | 'desc') ?? 'desc';

    setPage(pageFromUrl);
    setSearch(searchFromUrl);
    setStatus(
      statusFromUrl === 'Active' || statusFromUrl === 'Blocked'
        ? statusFromUrl
        : undefined
    );
    setJoinedFrom(joinedFromUrl);
    setJoinedTo(joinedToUrl);
    setSort({ key: sortBy, order: sortOrder });
  }, [searchParams]);



  return {
    users,
    isLoading,

    page,
    setPage,
    totalPages,
    total,
    pageSize: PAGE_SIZE,

    search,
    setSearch,
    status,
    setStatus,
    joinedFrom,
    setJoinedFrom,
    joinedTo,
    setJoinedTo,

    sort,
    setSort,

    refetch: fetchUsers,
  };
}
