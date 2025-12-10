import { useAuth } from "@/auth";
import { PageLoader } from "@/components";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PublicRoute = ({
  children,
  redirectTo = "/dashboard",
}: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
