import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, UserPlus, AlertCircle,
  Trophy, CreditCard, BarChart3, FolderKanban, LogOut
} from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { logoutService } from "../../services/auth.service";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: UserPlus, label: "Recruiters", href: "/admin/recruiters" },
  { icon: AlertCircle, label: "Problems", href: "/admin/problems" },
  { icon: Trophy, label: "Contests", href: "/admin/contests" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: BarChart3, label: "Leaderboard", href: "/admin/leaderboard" },
  { icon: FolderKanban, label: "Categories", href: "/admin/categories" },
];

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const location = useLocation();
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
    <aside
      className={`
        fixed lg:static z-40
        h-full w-60 bg-white shadow-sm
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col
      `}
    >
      <div className="px-6 py-5">
        <h1 className="text-xl font-bold text-indigo-600">CodeElevate</h1>
        <div className="mt-3 h-px bg-gray-200/70" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={closeSidebar}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6">
        <div className="h-px bg-gray-200/70" />
      </div>

      <div className="p-3">
        <span
          className="
            w-full flex items-center gap-3 px-3 py-2
            text-sm font-medium text-gray-600
            hover:text-red-600 hover:bg-red-50
            rounded-lg transition
          "
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </span>
      </div>
    </aside>
  );
}
