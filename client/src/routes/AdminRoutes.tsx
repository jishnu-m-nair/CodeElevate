import { Routes, Route } from "react-router-dom";

import AdminLoginPage from "../pages/admin/LoginPage";
import AdminHomePage from "../pages/admin/HomePage";
import UsersPage from "../pages/admin/UsersListPage";
import RecruitersPage from "../pages/admin/RecruitersListPage";
import ApproveRecruiter from "../pages/admin/ApproveRecruiter";
import NotFound from "../components/common/NotFound";
import PrivateRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicRoute />}>
        <Route path="login" element={<AdminLoginPage />} />
      </Route>

      {/* Private */}
      <Route element={<PrivateRoute allowedRole="admin" />}>
        <Route index element={<AdminHomePage />} />
        <Route path="home" element={<UsersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="recruiters" element={<RecruitersPage />} />
        <Route path="recruiters/approve" element={<ApproveRecruiter />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
