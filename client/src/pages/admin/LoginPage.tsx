import BaseLoginPage from "../auth/BaseLoginPage";
import { useAppDispatch } from "../../store/hooks";
import { loginAdminService } from "../../services/auth.service";
import type { LoginValues } from "../../types/authTypes";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  return (
    <BaseLoginPage
      title="Login as Admin"
      onLogin={(values: LoginValues) => loginAdminService(dispatch, values)}
      showSignup={false}
      showGoogle={false}
      showForgotPassword={false}
      role={'admin'}
    />
  );
}
