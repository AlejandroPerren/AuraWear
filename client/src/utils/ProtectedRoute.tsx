import { Navigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean; 
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAdmin, isLogged } = useAppStore();

  if (!isLogged()) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
