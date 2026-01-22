import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, LogOut } from 'lucide-react';
import { logoutService } from '../../services/auth.service';
import { useAppDispatch } from '../../store/hooks';
import { toast } from 'sonner';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const redirect = await logoutService(dispatch, 'user');
      toast.success('User logout success');
      navigate(redirect);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          CodeElevate
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/compete" className="hover:text-white">
            Compete
          </Link>
          <Link to="/apply" className="hover:text-white">
            Apply
          </Link>
          <Link to="/chats" className="hover:text-white">
            Chats
          </Link>
          <Link to="/problems" className="hover:text-white">
            Problems
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent px-2 py-1 text-sm text-white outline-none"
            />
          </div>

          <Bell size={18} className="text-gray-400 cursor-pointer" />
          <Menu size={20} className="text-gray-400 md:hidden" />
          <LogOut
            size={18}
            className="text-gray-400 cursor-pointer hover:text-red-400 transition"
            onClick={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};
