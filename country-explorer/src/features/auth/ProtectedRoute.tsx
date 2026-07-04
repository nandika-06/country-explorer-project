import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "./auth-storage";

function ProtectedRoute() {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
