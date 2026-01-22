import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoginForm from "../../components/auth/LoginForm";
import BaseAuthLayout from "../../layouts/BaseAuthLayoutProps";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import type { LoginValues, UserRole } from "../../types/authTypes";

interface BaseLoginPageProps {
  title: string;
  onLogin: (values: LoginValues) => Promise<string>;
  showSignup: boolean;
  showGoogle: boolean;
  showForgotPassword: boolean;
  signupPath?: string;
  role?: UserRole;
}

export default function BaseLoginPage({
  title,
  onLogin,
  showSignup,
  showGoogle,
  showForgotPassword,
  signupPath,
  role
}: BaseLoginPageProps) {
  const navigate = useNavigate();

  const handleLogin = async (values: LoginValues) => {
    try {
      const redirect = await onLogin(values);
      toast.success("Logged in!");
      navigate(redirect);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <BaseAuthLayout>
      <LoginForm
        title={title}
        subtitle="Enter your credentials"
        showGoogleLogin={showGoogle}
        showSignupLink={showSignup}
        showForgotPassword={showForgotPassword}
        onSubmit={handleLogin}
        signupPath={signupPath}
        role={role}
      />
    </BaseAuthLayout>
  );
}
