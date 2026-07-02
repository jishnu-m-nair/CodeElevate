import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/recruiter/LoginPage";
import SignupPage from "../pages/recruiter/SignupPage";
import OtpVerificationPage from "../pages/auth/OtpVerificationPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import ProfilePage from "../pages/recruiter/ProfilePage";
import CreateJobPage from '../pages/recruiter/CreateJobPage';
import NotFound from "../components/common/NotFound";
import PrivateRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function RecruiterRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />

      {/* Public */}
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="verify-otp" element={<OtpVerificationPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Private */}
      <Route element={<PrivateRoute allowedRole="recruiter" />}>
        <Route path="dashboard" element={<ProfilePage />} />
        <Route path="jobs" element={<CreateJobPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
