import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`text-xs text-gray-500 ${className}`}>
      © {new Date().getFullYear()} CodeElevate Inc. All rights reserved.
    </footer>
  );
};

export default Footer;
