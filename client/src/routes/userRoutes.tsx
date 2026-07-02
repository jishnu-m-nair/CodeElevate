import { Routes, Route } from "react-router-dom";
import OtpVerificationPage from "../pages/auth/OtpVerificationPage";
import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/user/LoginPage";
import SignupPage from "../pages/user/SignupPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import LandingPage from "../pages/auth/LandingPage";
import ProfilePage from "../pages/user/ProfilePage";
import DummyJobs from "../pages/auth/dummy";
import NotFound from "../components/common/NotFound";
import PrivateRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Public */}
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="verify-otp" element={<OtpVerificationPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Private */}
      <Route element={<PrivateRoute allowedRole="user" />}>
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="jobs" element={<DummyJobs />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}