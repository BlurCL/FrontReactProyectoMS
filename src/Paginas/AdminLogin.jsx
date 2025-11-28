// src/Paginas/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AdminLogin.css";

function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      // ⬇️ ahora login devuelve el usuario autenticado
      const usuario = await login(email, password);

      // Redirección según rol
      if (usuario?.rol === "TRABAJADOR") {
        navigate("/trabajador");
      } else {
        // por defecto, admin
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas o error en el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h2 className="login-title">Login administrador</h2>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-group">
          <label className="login-label">Correo</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin2@pasteleria.cl"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Contraseña</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="123456"
          />
        </div>

        <button type="submit" className="login-btn" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
