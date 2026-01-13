import React from 'react';
import SignupForm from '../../components/auth/SignupForm';
import AuthLeftPanel from '../../components/auth/AuthLeftPanel';
import Footer from '../../components/common/Footer';
import { signupUser } from '../../services/api/auth.api';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSignup = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      await signupUser({ name, email, password });

      console.log('Signup successful. OTP sent.');

      navigate('/otp-verification', { state: { email } });
    } catch (error: any) {
      console.error('Signup failed', error?.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      <AuthLeftPanel />

      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        <div className="w-full max-w-md px-8">
          <SignupForm onSubmit={handleSignup} />
        </div>

        <Footer className="absolute bottom-4" />
      </div>
    </div>
  );
};

export default SignupPage;
