import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import OtpVerificationPage from '../pages/auth/OtpVerificationPage';
import HomePage from '../pages/user/HomePage';
import ErrorBoundary from '../components/common/ErrorBoundary';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="*" element={<div className="text-white p-10">Page Not Found</div>} />
    </Routes>
  );
};

export default UserRoutes;
