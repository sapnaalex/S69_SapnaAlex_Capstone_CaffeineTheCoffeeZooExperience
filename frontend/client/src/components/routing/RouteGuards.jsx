import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PageLoader from "../ui/PageLoader";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <PageLoader label="Restoring your coffee trail…" />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageLoader label="Opening Caffeine…" />;
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};
