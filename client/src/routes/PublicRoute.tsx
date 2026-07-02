import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function PublicRoute() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    // redirect based on role
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "recruiter") return <Navigate to="/recruiter/" replace />;
    if (role === "user") return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}