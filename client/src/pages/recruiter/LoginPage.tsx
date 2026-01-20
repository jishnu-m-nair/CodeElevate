import BaseLoginPage from "../auth/BaseLoginPage";
import { useAppDispatch } from "../../store/hooks";
import { loginRecruiterService } from "../../services/auth.service";
import type { LoginValues } from "../../types/authTypes";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  
  return (
    <BaseLoginPage
      title="Login as Recruiter"
      onLogin={(values: LoginValues) => loginRecruiterService(dispatch, values)}
      showSignup={true}
      showGoogle={true}
      showForgotPassword={true}
      signupPath="/recruiter/signup"
    />
  );
}
