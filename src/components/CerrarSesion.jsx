import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/CerrarSesion.css"; 

export default function CerrarSesion() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login"); 
  };


  if (!token) return null;

  return (
    <button
      className="btn-cerrar-sesion" 
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  );
}
