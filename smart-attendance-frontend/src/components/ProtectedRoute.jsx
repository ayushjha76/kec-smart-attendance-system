import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole,
}) {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  /* NO TOKEN */

  if (!token) {
    return <Navigate to="/" replace />;
  }

  /* WRONG ROLE */

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  /* ACCESS ALLOWED */

  return children;
}

export default ProtectedRoute;