import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import type { UserRole } from "../../types/authTypes";
import { forgotPasswordService } from "../../services/auth.service";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  role?: UserRole;
}

export const ForgotPasswordModal = ({
  open,
  onClose,
  role,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const message = await forgotPasswordService(email, role);

      toast.success(message);
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
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
            Forgot Password
          </DialogTitle>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full mt-4 p-2 rounded"
            placeholder="Enter email"
          />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
