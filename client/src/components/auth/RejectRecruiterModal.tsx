import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface RejectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
}

const RejectRecruiterModal = ({
  open,
  onClose,
  onSubmit,
}: RejectModalProps) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) return;

    try {
      setLoading(true);
      await onSubmit(reason);
      setReason("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl p-6 w-full max-w-md"
        >
          <DialogTitle className="text-lg font-semibold">
            Reject Recruiter
          </DialogTitle>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border w-full mt-4 p-2 rounded resize-none"
            placeholder="Enter rejection reason..."
            rows={4}
          />

          <div className="flex gap-2 mt-4">
            <button
              onClick={onClose}
              className="w-1/2 border py-2 rounded"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-1/2 bg-red-600 text-white py-2 rounded disabled:opacity-50"
            >
              {loading ? "Rejecting..." : "Reject"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default RejectRecruiterModal;