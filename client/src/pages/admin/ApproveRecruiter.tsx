import AdminLayout from '../../layouts/AdminLayout';
import { Table } from '../../components/common/Table';
import { Pagination } from '../../components/common/Pagination';
import { toast } from 'sonner';
import { useCallback, useEffect, useState } from 'react';
import { approveRecruiterService, fetchPendingRecruitersService, rejectRecruiterService } from '../../services/admin.service';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import { useNavigate } from 'react-router-dom';
import RejectRecruiterModal from '../../components/auth/RejectRecruiterModal';

interface Recruiter {
  id: string;
  companyName: string;
  email: string;
  companyWebsite: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function RecruitersListMain() {

  const [data, setData] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetchPendingRecruitersService({
        page,
        limit: pageSize,
      });

      setData(res.recruiters);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApprove = async (id: string) => {
    try {
      await approveRecruiterService(id);
      toast.success('Recruiter approved');

      fetchData();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  const handleRejectClick = (id: string) => {
    setSelectedId(id);
    setRejectModalOpen(true);
  };

  const handleRejectSubmit = async (reason: string) => {
    if (!selectedId) return;

    try {
      await rejectRecruiterService(selectedId, reason);
      toast.success("Recruiter rejected");

      setRejectModalOpen(false);
      setSelectedId(null);

      fetchData();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return (
    <AdminLayout title="Recruiter Requests">
      <RejectRecruiterModal
        open={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setSelectedId(null);
        }}
        onSubmit={handleRejectSubmit}
      />
    {loading ? (
      <div className="mt-4 text-center text-gray-500">
        Loading recruiters...
      </div>
    ) : (
      <>
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Approve or Reject Recruiters
        </h2>

        <button
          onClick={() => navigate('/admin/recruiters')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          View All Recruiters
        </button>
      </div>
        <div className="mt-4">
          <Table<Recruiter>
            data={data}
            keyExtractor={(r) => r.id}
            columns={[
              {
                key: '__index',
                header: 'Sl.No',
                width: '80px',
                render: (_, index) =>
                  (page - 1) * pageSize + index + 1,
              },
              { key: 'companyName', header: 'Company Name' },
              { key: 'email', header: 'Email' },
              {
                key: 'companyWebsite',
                header: 'Website',
                render: (row) => row.companyWebsite,
              },
              { key: 'date', header: 'Joined' },
              {
                key: 'status',
                header: 'Status',
                render: (row) => (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : row.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {row.status}
                  </span>
                ),
              },
            ]}
            actions={[
              {
                label: 'Approve',
                variant: 'primary',
                onClick: (row) => handleApprove(row.id),
                show: (row) => row.status === 'pending',
              },
              {
                label: 'Reject',
                variant: 'danger',
                onClick: (row) => handleRejectClick(row.id),
                show: (row) => row.status === 'pending',
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
      </>
    )}
  </AdminLayout>
  );
}