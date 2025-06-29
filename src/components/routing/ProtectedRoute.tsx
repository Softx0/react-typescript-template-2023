import React, {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, requiredRole}) => {
  const {state} = useAuth();

  // Si no está autenticado, redirigir al login
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere un rol específico y el usuario no lo tiene
  if (requiredRole && state.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
