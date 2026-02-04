import AdminLayout from '../../layouts/AdminLayout';
import { Table } from '../../components/common/Table';
import type { AdminUserListItem } from '../../services/api/interface/adminApi.interface';
import { useAdminUsers } from '../../hooks/admin/useAdminUsers';
import { Pagination } from '../../components/common/Pagination';
import { blockUserService, unblockUserService } from '../../services/admin.service';
import { toast } from 'sonner';

export default function UsersPage() {
  const {
    users,
    isLoading,

    page,
    setPage,
    totalPages,

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
    pageSize,
    refetch
  } = useAdminUsers();

  return (
    <AdminLayout title="Users">
      <div className="bg-white p-4 rounded-md border flex flex-wrap gap-4 items-end">
        <div className="flex flex-col text-sm">
          <label className="text-gray-600 mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Name, username or email"
            className="border rounded px-2 py-1"
          />
        </div>

        <div className="flex flex-col text-sm">
          <label className="text-gray-600 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as 'Active' | 'Blocked');
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div className="flex flex-col text-sm">
          <label className="text-gray-600 mb-1">Joined from</label>
          <input
            type="date"
            value={joinedFrom ?? ''}
            onChange={(e) => {
              setJoinedFrom(e.target.value || null);
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          />
        </div>

        <div className="flex flex-col text-sm">
          <label className="text-gray-600 mb-1">Joined to</label>
          <input
            type="date"
            value={joinedTo ?? ''}
            onChange={(e) => {
              setJoinedTo(e.target.value || null);
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          />
        </div>

        <div className="flex flex-col text-sm">
          <label className="text-gray-600 mb-1">Sort by</label>
          <select
            value={`${sort.key}-${sort.order}`}
            onChange={(e) => {
              const [key, order] = e.target.value.split('-') as [
                'name' | 'joined',
                'asc' | 'desc'
              ];

              setSort({ key, order });
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="joined-desc">Joined (Newest)</option>
            <option value="joined-asc">Joined (Oldest)</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearch('');
            setStatus(undefined);
            setJoinedFrom(null);
            setJoinedTo(null);
            setSort({ key: 'joined', order: 'desc' });
            setPage(1);
          }}
          className="ml-auto text-sm text-red-600 hover:underline"
        >
          Clear filters
        </button>
      </div>

      <div className="mt-4">
        <Table<AdminUserListItem>
          data={users}
          isLoading={isLoading}
          keyExtractor={(u) => u.id}
          columns={[
            {
              key: '__index',
              header: 'Sl.No',
              width: '80px',
              render: (_, index) => (page - 1) * pageSize + index + 1,
            },
            { key: 'name', header: 'Name'},
            { key: 'username', header: 'Username' },
            { key: 'email', header: 'Email' },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    row.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            { key: 'joined', header: 'Joined'},
          ]}
          actions={[
            {
              label: 'Block',
              variant: 'danger',
              onClick: async (row) => {
                try {
                  await blockUserService(row.id);
                  toast.success(`${row.name} has been blocked`);
                  refetch();
                } catch {
                  toast.error('Failed to block user');
                }
              },
              show: (row) => row.status === 'Active',
            },
            {
              label: 'Unblock',
              onClick: async (row) => {
                try {
                  await unblockUserService(row.id);
                  toast.success(`${row.name} has been unblocked`);
                  refetch();
                } catch {
                  toast.error('Failed to unblock user');
                }
              },
              show: (row) => row.status === 'Blocked',
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </AdminLayout>
  );
}
