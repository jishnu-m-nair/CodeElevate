import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/recruiter/DashboardPage";
import LoginPage from "../pages/recruiter/LoginPage";
import SignupPage from "../pages/recruiter/SignupPage";
import OtpVerificationPage from "../pages/auth/OtpVerificationPage";

export default function RecruiterRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />

      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="verify-otp" element={<OtpVerificationPage />} />

      <Route path="dashboard" element={<DashboardPage />} />

      <Route path="*" element={<div className="text-white p-10">Recruiter Page Not Found</div>} />
    </Routes>
  );
}
