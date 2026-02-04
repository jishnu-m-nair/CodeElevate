import React from 'react';
import { Search, Bell, MessageCircle, Moon, Sun, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
  onSearchChange?: (value: string) => void;
  onNotificationClick?: () => void;
  onMailClick?: () => void;
  messageCount?: number;
  notificationCount?: number;
}

type GreetingInfo = {
  text: string;
  icon: 'sun' | 'moon';
};

export default function Navbar({
  onMenuClick,
  onSearchChange,
  onNotificationClick,
  onMailClick,
  messageCount = 0,
  notificationCount = 0,
}: NavbarProps) {
  const [searchValue, setSearchValue] = React.useState('');
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const sync = () => {
      setCurrentTime(new Date());

      intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
    };

    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeoutId = setTimeout(sync, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = currentTime.toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const getGreeting = (): GreetingInfo => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good Morning', icon: 'sun' };
    if (hour < 18) return { text: 'Good Afternoon', icon: 'sun' };
    return { text: 'Good Evening', icon: 'moon' };
  };

  const { text, icon } = getGreeting();

  return (
    <nav className="bg-gray-100 border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-md">
          <button
            onClick={onMenuClick}
            className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-200"
          >
            <Menu size={22} />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search for anything here.."
              className="w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => onSearchChange?.(searchValue)}
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-6">
          <button
            onClick={onNotificationClick}
            className="relative p-2 rounded-full bg-gray-200 hover:bg-blue-200 transition-colors"
          >
            <Bell size={20} className="text-gray-700" />
            {notificationCount > 0 && (
              <span
                className="
                  absolute top-1 right-1
                  translate-x-1/2 -translate-y-1/2
                  flex items-center justify-center
                  bg-red-500 text-white font-bold
                  text-[9px] leading-none
                  h-4 min-w-4 px-1
                  rounded-full border border-white
                  shadow-sm pointer-events-none
                "
              >
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>

          <button
            onClick={onMailClick}
            className="relative p-2 bg-gray-200 hover:bg-blue-200 rounded-full transition-colors"
          >
            <MessageCircle size={20} className="text-gray-700" />
            {messageCount > 0 && (
              <span
                className="
                  absolute top-1 right-1
                  translate-x-1/2 -translate-y-1/2
                  flex items-center justify-center
                  bg-red-500 text-white font-bold
                  text-[9px] leading-none
                  h-4 min-w-4 px-1
                  rounded-full border border-white
                  shadow-sm pointer-events-none
                "
              >
                {messageCount > 99 ? '99+' : messageCount}
              </span>
            )}
          </button>

          <div className="h-8 w-px bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                icon === 'sun' ? 'bg-yellow-400' : 'bg-indigo-500'
              }`}
            >
              {icon === 'sun' ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} className="text-white" />
              )}
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800">{text}, Admin</div>
              <div className="text-xs text-gray-500">{formattedTime}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
