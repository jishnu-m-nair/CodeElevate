import { useAppDispatch } from "../../store/hooks";
import { loginUserService } from "../../services/auth.service";
import type { LoginValues } from "../../types/authTypes";
import BaseLoginPage from "../auth/BaseLoginPage";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  return (
    <BaseLoginPage
      title="Login as User"
      onLogin={(values: LoginValues) => loginUserService(dispatch, values)}
      showSignup={true}
      showGoogle={true}
      showForgotPassword={true}
      signupPath="/signup"
      role={'user'}
    />
  );
}
