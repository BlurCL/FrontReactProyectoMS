// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Ruta protegida:
 * - Si NO hay token → redirige a /admin/login
 * - Si hay token pero el rol no es admin → lo mando al home (puedes cambiarlo)
 * - Si todo ok → muestra el children (la página privada)
 */
function ProtectedRoute({ children }) {
  const { token, isAdmin } = useAuth();

  // No autenticado -> a login admin
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Autenticado pero sin rol admin -> al home (o donde quieras)
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Autenticado y con rol correcto -> renderiza contenido privado
  return children;
}

export default ProtectedRoute;
