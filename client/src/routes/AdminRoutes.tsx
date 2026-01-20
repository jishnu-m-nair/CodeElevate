import { Routes, Route, Navigate } from "react-router-dom";

import AdminLoginPage from "../pages/admin/LoginPage";
import AdminHomePage from "../pages/admin/HomePage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />

      <Route path="login" element={<AdminLoginPage />} />
      <Route path="home" element={<AdminHomePage />} />

      <Route path="*" element={<div className="text-white p-10">Admin Page Not Found</div>} />
    </Routes>
  );
}
