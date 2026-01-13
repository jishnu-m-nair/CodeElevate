import React from 'react';

const AuthLeftPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/code-background.svg')",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-gray-900/80 to-black/90" />

      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-3xl font-bold text-white">CodeElevate</h1>
        <p className="mt-2 text-sm text-gray-300 max-w-xs">
          Elevate your coding skills. Practice, compete, and get hired.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />
    </div>
  );
};

export default AuthLeftPanel;
