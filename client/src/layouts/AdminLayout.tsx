import Sidebar from '../components/common/AdminSidebar';
import Navbar from '../components/common/AdminNavbar';
import Footer from '../components/common/AdminFooter';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto px-8 py-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
