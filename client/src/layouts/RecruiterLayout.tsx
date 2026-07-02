import Sidebar from "../components/recruiter/Sidebar";
import Navbar from "../components/recruiter/Navbar";
import Footer from "../components/recruiter/Footer";
import { useState } from "react";

interface RecruiterLayoutProps {
  children: React.ReactNode;
}

export default function RecruiterLayout({
  children,
}: RecruiterLayoutProps) {
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

        <main className="flex-1 overflow-auto px-6 py-5 bg-gray-100">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}