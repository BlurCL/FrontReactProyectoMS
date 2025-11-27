// src/components/ProtectedRouteWorker.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRouteWorker({ children }) {
  const { token, isTrabajador } = useAuth();

  // Si no está logueado → lo mando al mismo login admin/trabajador
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si está logueado pero NO es TRABAJADOR → al home
  if (!isTrabajador) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRouteWorker;
