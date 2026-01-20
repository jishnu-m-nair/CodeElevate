import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import Footer from "../components/common/Footer";

interface BaseAuthLayoutProps {
  children: React.ReactNode;
}

export default function BaseAuthLayout({ children }: BaseAuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-900">
      <AuthLeftPanel />

      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        <div className="w-full max-w-md px-8">{children}</div>
        <Footer className="absolute bottom-4" />
      </div>
    </div>
  );
}
