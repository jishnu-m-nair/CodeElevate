import { Routes, Route } from "react-router-dom";

import AdminLoginPage from "../pages/admin/LoginPage";
import AdminHomePage from "../pages/admin/HomePage";
import UsersPage from "../pages/admin/UsersListPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<AdminHomePage />} />

      <Route path="login" element={<AdminLoginPage />} />
      <Route path="home" element={<AdminHomePage />} />
      <Route path="users" element={<UsersPage />} />

      <Route path="*" element={<div className="text-black p-10">Admin Page Not Found</div>} />
    </Routes>
  );
}
