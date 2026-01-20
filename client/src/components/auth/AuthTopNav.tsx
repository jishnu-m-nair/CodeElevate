import React from 'react';

const AuthTopNav: React.FC = () => {
  return (
    <nav className="absolute top-8 right-8 flex items-center space-x-6">
      <a href="/login" className="text-gray-400 hover:text-white transition">
        Login
      </a>

      <button aria-label="Switch theme" className="text-gray-400 hover:text-white transition">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </button>
    </nav>
  );
};

export default AuthTopNav;
