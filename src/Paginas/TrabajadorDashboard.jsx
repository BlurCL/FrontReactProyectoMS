// src/Paginas/TrabajadorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPedidosActivos,
  marcarPedidoEnviado,
} from "../api/orderApi";

function formatearFecha(fechaIso) {
  if (!fechaIso) return "-";
  const d = new Date(fechaIso);
  if (Number.isNaN(d.getTime())) return fechaIso;
  return d.toLocaleString("es-CL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TrabajadorDashboard() {
  const { user, token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Cargar pedidos activos al entrar
  useEffect(() => {
    const fetchPedidos = async () => {
      setCargando(true);
      setError("");
      try {
        const data = await getPedidosActivos(token);
        setPedidos(data || []);
      } catch (e) {
        console.error(e);
        setError("Error al obtener pedidos activos");
      } finally {
        setCargando(false);
      }
    };

    if (token) {
      fetchPedidos();
    }
  }, [token]);

  const handleMarcarEnviado = async (idPedido) => {
    try {
      await marcarPedidoEnviado(idPedido, token);

      // Actualizamos el estado local: cambiamos estadoPedido a ENVIADO
      setPedidos((prev) =>
        prev.map((p) =>
          p.idPedido === idPedido ? { ...p, estadoPedido: "ENVIADO" } : p
        )
      );
    } catch (e) {
      console.error(e);
      alert("No se pudo marcar como enviado");
    }
  };

  return (
    <div className="admin-layout">
      <h1 className="admin-title">Panel trabajador</h1>
      <p>
        Bienvenido {user?.nombre} ({user?.rol})
      </p>

      <h2 className="admin-subtitle" style={{ marginTop: "2rem" }}>
        Pedidos activos
      </h2>

      {cargando && <p>Cargando pedidos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!cargando && pedidos.length === 0 && (
        <p>No hay pedidos activos por ahora.</p>
      )}

      {pedidos.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha pedido</th>
                <th>Productos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => {
                const nombresProductos = (p.detalles || [])
                  .map((d) => d.nombreProducto)
                  .join(", ");

                const estado = p.estadoPedido || "-";
                const esFacturado = estado === "FACTURADO";
                const esEnviado = estado === "ENVIADO";

                return (
                  <tr key={p.idPedido}>
                    <td>{p.idPedido}</td>
                    <td>{formatearFecha(p.fechaPedido)}</td>
                    <td>{nombresProductos || "-"}</td>
                    <td>{estado}</td>
                    <td>
                      {esEnviado ? (
                        <span className="estado-texto-ok">Enviado</span>
                      ) : esFacturado ? (
                        <button
                          type="button"
                          className="btn-small btn-primary"
                          onClick={() => handleMarcarEnviado(p.idPedido)}
                        >
                          Marcar enviado
                        </button>
                      ) : (
                        <span className="texto-mutedo">Pendiente</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrabajadorDashboard;
