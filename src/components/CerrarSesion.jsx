// src/components/CerrarSesion.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/CerrarSesion.css";

function CerrarSesion() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Si no hay usuario logueado, no mostramos nada
  if (!user) return null;

  return (
    <button className="logout-pill" type="button" onClick={handleLogout}>
      <span className="logout-user">
        {user.nombre || user.email || "Usuario"}
      </span>
      <span className="logout-separator">|</span>
      <span className="logout-text">Cerrar sesión</span>
    </button>
  );
}

export default CerrarSesion;
