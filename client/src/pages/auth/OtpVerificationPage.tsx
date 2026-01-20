import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import BaseAuthLayout from "../../layouts/BaseAuthLayoutProps";
import OtpInput from "../../components/auth/OtpInput";
import { verifyOtpService, resendOtpService } from "../../services/auth.service";

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { email, role } = location.state as {
    email: string;
    role: "user" | "recruiter";
  };

  const handleVerifyOtp = async (otp: string) => {
    const redirect = await verifyOtpService(dispatch, email, otp, role);
    navigate(redirect);
  };

  return (
    <BaseAuthLayout>
      <OtpInput
        email={email}
        onVerify={handleVerifyOtp}
        onResend={() => resendOtpService(email, role)}
      />
    </BaseAuthLayout>
  );
}
