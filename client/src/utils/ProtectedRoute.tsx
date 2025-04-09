import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAdmin, isLogged } = useAppStore();
  const location = useLocation();

  const path = location.pathname;
  const loggedIn = isLogged();
  const admin = isAdmin();

  const isAuthPage = path.startsWith("/auth");
  const isAdminRoute = path.startsWith("/admin");
  const isUserRoute = path.startsWith("/users");

  if (!loggedIn && (isAdminRoute || isUserRoute)) {
    return <Navigate to="/auth" replace />;
  }

  if (loggedIn && isAuthPage) {
    return <Navigate to={admin ? "/admin" : "/"} replace />;
  }

  if (isAdminRoute && !admin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
