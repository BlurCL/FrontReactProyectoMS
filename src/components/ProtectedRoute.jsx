// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Ruta protegida:
 * - Si NO hay token → redirige a /admin/login
 * - Sin props: sólo ADMIN (comportamiento legacy)
 * - Con requiredRole: valida ese rol exacto (por ej. "TRABAJADOR")
 */
function ProtectedRoute({ children, requiredRole }) {
  // ⬇️ ESTA LÍNEA ES LA QUE FALTABA
  const { token, user, isAdmin } = useAuth();

  // 1) No autenticado -> a login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // 2) Si se especifica un rol requerido (ej: TRABAJADOR)
  if (requiredRole) {
    if (user?.rol !== requiredRole) {
      // Tiene token, pero rol incorrecto → lo mando al home
      return <Navigate to="/" replace />;
    }
    return children; // rol correcto
  }

  // 3) Comportamiento anterior: sólo admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
