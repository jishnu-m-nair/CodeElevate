import AdminLayout from '../../layouts/AdminLayout';
import { Table } from '../../components/common/Table';
import type { AdminRecruiterListItem } from '../../services/api/interface/adminApi.interface';
import { useAdminRecruiters } from '../../hooks/admin/useAdminRecruiters';
import { Pagination } from '../../components/common/Pagination';
import {
  blockRecruiterService,
  unblockRecruiterService,
} from '../../services/admin.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function RecruitersPage() {
  const {
    recruiters,
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
    refetch,
  } = useAdminRecruiters();

  const  navigate = useNavigate();

  return (
    <AdminLayout title="Recruiters">
      <>
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
              placeholder="Company name or email"
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
            <option value="name-asc">Company (A–Z)</option>
            <option value="name-desc">Company (Z–A)</option>
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate('/admin/recruiters/approve')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            View All Recruiters
          </button>
      </div>
      </div>
      
      </>

      <div className="mt-4">
        <Table<AdminRecruiterListItem>
          data={recruiters}
          isLoading={isLoading}
          keyExtractor={(r) => r.id}
          columns={[
            {
              key: '__index',
              header: 'Sl.No',
              width: '80px',
              render: (_, index) => (page - 1) * pageSize + index + 1,
            },
            { key: 'companyName', header: 'Company Name' },
            { key: 'email', header: 'Email' },
            { key: 'companyWebsite', header: 'Website' },
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
            { key: 'joined', header: 'Joined' },
          ]}
          actions={[
            {
              label: 'Block',
              variant: 'danger',
              onClick: async (row) => {
                try {
                  await blockRecruiterService(row.id);
                  toast.success(`${row.companyName} blocked`);
                  refetch();
                } catch {
                  toast.error('Failed to block recruiter');
                }
              },
              show: (row) => row.status === 'Active',
            },
            {
              label: 'Unblock',
              onClick: async (row) => {
                try {
                  await unblockRecruiterService(row.id);
                  toast.success(`${row.companyName} unblocked`);
                  refetch();
                } catch {
                  toast.error('Failed to unblock recruiter');
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