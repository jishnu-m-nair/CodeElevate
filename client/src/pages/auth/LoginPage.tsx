import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import AuthLeftPanel from '../../components/auth/AuthLeftPanel';
import Footer from '../../components/common/Footer';
import { loginUser } from '../../services/api/auth.api';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await loginUser({ email, password });

      // store token
      localStorage.setItem('accessToken', data.accessToken);

      console.log('Login success:', data);

      // later:
      // dispatch(setUserInfo(data.user));
      navigate('/home');
    } catch (error: any) {
      console.error('Login failed', error?.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      <AuthLeftPanel />

      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        <div className="w-full max-w-md px-8">
          <LoginForm onSubmit={handleLogin} />
        </div>

        <Footer className="absolute bottom-4" />
      </div>
    </div>
  );
};

export default LoginPage;
