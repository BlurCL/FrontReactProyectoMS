import React from "react";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-container">

      <h1 className="admin-title">Panel de Administración</h1>

      <div className="admin-grid">

        {/* Tarjeta 1 */}
        <div className="admin-card">
          <h2>Usuarios registrados</h2>
          <p>Administra, edita o elimina usuarios del sistema.</p>
          <button className="admin-btn">Ver usuarios</button>
        </div>

        {/* Tarjeta 2 */}
        <div className="admin-card">
          <h2>Productos</h2>
          <p>Agrega, edita o elimina productos del catálogo.</p>
          <button className="admin-btn">Gestionar productos</button>
        </div>

        {/* Tarjeta 3 */}
        <div className="admin-card">
          <h2>Reportes</h2>
          <p>Revisa métricas y actividad reciente del sistema.</p>
          <button className="admin-btn">Ver reportes</button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
