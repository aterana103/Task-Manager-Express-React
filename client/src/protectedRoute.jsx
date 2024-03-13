import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export function ProtectedRoute() {
  const {loading, isAuthenticated} = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }
  return <Outlet />;
}

export default ProtectedRoute;