import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordService } from "../../services/auth.service";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import BaseAuthLayout from "../../layouts/BaseAuthLayoutProps";

type Role = "user" | "recruiter";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");
  const roleParam = params.get("role");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!token || (roleParam !== "user" && roleParam !== "recruiter")) {
      toast.error('Invalid or expired reset link')
      return 
    }

  const role: Role = roleParam;

    try {
      setLoading(true);
      await resetPasswordService(
        newPassword,
        role,
        token
      );

      navigate("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseAuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl border border-gray-700"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">New Password</h2>
            <p className="text-gray-400 text-sm mt-2">
              Please enter your new password below.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-6 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </BaseAuthLayout>
  );
}