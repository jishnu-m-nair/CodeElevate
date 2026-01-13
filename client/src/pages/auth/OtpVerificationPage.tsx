import React from 'react';
import AuthLeftPanel from '../../components/auth/AuthLeftPanel';
import Footer from '../../components/common/Footer';
import OtpVerificationForm from '../../components/auth/OtpVerificationForm';
import { verifyOtp } from '../../services/api/auth.api';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const handleVerifyOtp = async (otp: string) => {
    if (!email) {
      console.error('Email not found for OTP verification');
      return;
    }

    try {
      await verifyOtp({ email, otp });

      console.log('OTP verified successfully');

      navigate('/login');
    } catch (error: any) {
      console.error('OTP verification failed', error?.response?.data || error.message);
    }
  };

  const handleResendOtp = () => {
    console.log('Resending OTP...');
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      <AuthLeftPanel />

      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        <div className="w-full max-w-md px-8">
          <OtpVerificationForm
            email="jishnu23@gmail.com"
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
          />
        </div>

        <Footer className="absolute bottom-4" />
      </div>
    </div>
  );
};

export default OtpVerificationPage;
