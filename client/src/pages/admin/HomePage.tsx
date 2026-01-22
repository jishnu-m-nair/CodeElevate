import { useNavigate } from "react-router-dom";
import { logoutService } from "../../services/auth.service";
import { useAppDispatch } from "../../store/hooks";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function AdminHomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const redirect = await logoutService(dispatch, 'admin');
      toast.success('Admin logout success');
      navigate(redirect);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className="p-10 text-black text-2xl">
      <h1>Admin Home</h1>
      <LogOut
        size={18}
        className="text-gray-400 cursor-pointer hover:text-red-400 transition"
        onClick={handleLogout}
      />
    </div>
  );
}
