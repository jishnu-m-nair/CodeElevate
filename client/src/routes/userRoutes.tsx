import { Routes, Route } from "react-router-dom";
import OtpVerificationPage from "../pages/auth/OtpVerificationPage";
import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/user/LoginPage";
import SignupPage from "../pages/user/SignupPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import LandingPage from "../pages/auth/LandingPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      <Route path="login" element={<LoginPage />}/>
      <Route path="signup" element={<SignupPage />} />
      <Route path="verify-otp" element={<OtpVerificationPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path='reset-password' element={<ResetPasswordPage/>} />

      <Route
        path="*"
        element={<div className="text-white p-10">Page Not Found</div>}
      />
    </Routes>
  );
}
