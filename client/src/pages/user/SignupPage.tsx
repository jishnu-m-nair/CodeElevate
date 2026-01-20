import { useNavigate } from "react-router-dom";
import { signupUserService } from "../../services/auth.service";
import type { UserSignupRequest } from "../../services/api/interface/authApi.interface";
import BaseAuthLayout from "../../layouts/BaseAuthLayoutProps";
import UserSignupForm from "../../components/auth/UserSignupForm";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export default function SignupPage() {
  const navigate = useNavigate();
  const handleSignup = async (data: UserSignupRequest) => {
    try {
      const result = await signupUserService(data);
      toast.success('Signup success. Please verify email')
      navigate(result.nextRoute, {
        state: { email: result.email, role: "user" },
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
          
        }
  return (
    <BaseAuthLayout>
      <UserSignupForm
        onSubmit={handleSignup}
      />
    </BaseAuthLayout>
  );
}
