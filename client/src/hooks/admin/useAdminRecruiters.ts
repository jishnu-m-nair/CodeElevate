import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AdminRecruiterListItem } from '../../services/api/interface/adminApi.interface';
import { fetchAdminRecruitersService } from '../../services/admin.service';

const PAGE_SIZE = 10;

export function useAdminRecruiters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recruiters, setRecruiters] = useState<AdminRecruiterListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'Active' | 'Blocked' | undefined>();
  const [joinedFrom, setJoinedFrom] = useState<string | null>(null);
  const [joinedTo, setJoinedTo] = useState<string | null>(null);

  const [sort, setSort] = useState({
    key: 'joined' as 'name' | 'joined',
    order: 'desc' as 'asc' | 'desc',
  });

  const fetchRecruiters = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminRecruitersService({
        search,
        status,
        joinedFrom,
        joinedTo,
        sortBy: sort.key,
        sortOrder: sort.order,
        page,
        limit: PAGE_SIZE,
      });

      setRecruiters(data.users);
      setTotalPages(data.totalPages);
    } finally {
      setIsLoading(false);
    }
  }, [search, status, joinedFrom, joinedTo, sort, page]);

  useEffect(() => {
    fetchRecruiters();
  }, [fetchRecruiters]);

  return {
    recruiters,
    isLoading,

    page,
    setPage,
    totalPages,
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

    refetch: fetchRecruiters,
  };
}