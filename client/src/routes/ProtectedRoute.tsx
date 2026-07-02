import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { clearAuth } from "../store/slices/authSlice";

interface Props {
  allowedRole: "admin" | "recruiter" | "user";
}

export default function PrivateRoute({ allowedRole }: Props) {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → force logout
  if (role !== allowedRole) {
    dispatch(clearAuth());
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}