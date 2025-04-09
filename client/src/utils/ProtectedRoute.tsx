import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAdmin, isLogged } = useAppStore();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth");

  if (isAuthPage && isLogged()) {
    return <Navigate to="/" replace />;
  }

  if (!isLogged() && !isAuthPage) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
