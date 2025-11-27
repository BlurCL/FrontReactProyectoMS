// src/Paginas/TrabajadorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPedidosActivos,
  marcarPedidoPreparado,
  marcarPedidoEnviado,
} from "../api/orderApi";

import "../styles/AdminDashboard.css"; // reutilizamos estilos del admin

function TrabajadorDashboard() {
  const { user, token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarPedidos = async () => {
    setCargando(true);
    setError("");
    try {
      const data = await getPedidosActivos(token);
      setPedidos(data);
    } catch (e) {
      console.error(e);
      setError(e.message || "Error al cargar pedidos activos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) {
      cargarPedidos();
    }
  }, [token]);

  const handlePreparado = async (idPedido) => {
    try {
      await marcarPedidoPreparado(idPedido, token);
      await cargarPedidos(); // recargamos lista
    } catch (e) {
      alert(e.message || "No se pudo marcar como preparado");
    }
  };

  const handleEnviado = async (idPedido) => {
    try {
      await marcarPedidoEnviado(idPedido, token);
      await cargarPedidos();
    } catch (e) {
      alert(e.message || "No se pudo marcar como enviado");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel trabajador</h1>
      <p className="admin-subtitle">
        Bienvenido {user?.nombre} {user?.apellido} ({user?.rol})
      </p>

      {error && <div className="admin-error">{error}</div>}

      {cargando ? (
        <p>Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p>No hay pedidos activos por ahora.</p>
      ) : (
        <div className="admin-card">
          <h2 className="admin-card-title">Pedidos activos</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha pedido</th>
                <th>ID Usuario</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.idPedido}>
                  <td>{p.idPedido}</td>
                  <td>{p.fechaPedido}</td>
                  <td>{p.idUsuario}</td>
                  <td>${p.totalPedido}</td>
                  <td>{p.estadoPedido}</td>
                  <td>
                    {(p.estadoPedido === "CREADO" ||
                      p.estadoPedido === "FACTURADO") && (
                      <button
                        className="btn-small btn-primary"
                        onClick={() => handlePreparado(p.idPedido)}
                      >
                        Marcar preparado
                      </button>
                    )}

                    {p.estadoPedido === "PREPARADO" && (
                      <button
                        className="btn-small btn-secondary"
                        onClick={() => handleEnviado(p.idPedido)}
                        style={{ marginLeft: "8px" }}
                      >
                        Marcar enviado
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrabajadorDashboard;
