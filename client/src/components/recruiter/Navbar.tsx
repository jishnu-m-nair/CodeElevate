import { Search, Settings, Bell, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Navbar({
  onMenuClick,
  title = "Overview",
}: NavbarProps) {
  return (
    <header className="w-full bg-white px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <span className="hidden sm:block text-gray-600 font-medium">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
          <Search size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for something"
            className="bg-transparent outline-none text-sm w-40 lg:w-56"
          />
        </div>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={18} />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
      </div>
    </header>
  );
}