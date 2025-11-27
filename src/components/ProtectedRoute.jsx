// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Ruta protegida:
 * - Si NO hay token → redirige a /admin/login
 * - Modo legacy (sin props): sólo admin, como antes
 * - Si pasas requiredRole → valida ese rol exacto (TRABAJADOR, ADMINISTRADOR, etc.)
 */
function ProtectedRoute({ children, requiredRole }) {
  const { token, isAdmin, user } = useAuth();

  // No autenticado -> a login admin
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si se especifica un rol requerido (nuevo comportamiento)
  if (requiredRole) {
    if (user?.rol !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // 🔙 Comportamiento anterior: sólo admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
