import { useNavigate } from "react-router-dom";
import type { RecruiterSignupRequest } from "../../services/api/interface/authApi.interface";
import { signupRecruiterService } from "../../services/auth.service";
import BaseAuthLayout from "../../layouts/BaseAuthLayoutProps";
import RecruiterSignupForm from "../../components/auth/RecruiterSignupForm";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export default function SignupPage() {
  const navigate = useNavigate();
  const handleSignup = async (data: RecruiterSignupRequest) => {
    try {
      const result = await signupRecruiterService(data);
      toast.success('Signup success. Please verify email')
      navigate(result.nextRoute, {
        state: { email: result.email, role: "recruiter" },
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
    
  }

  return (
    <BaseAuthLayout>
          <RecruiterSignupForm
            onSubmit={handleSignup}
          />
        </BaseAuthLayout>
  );
}
