// src/Paginas/AdminEnvios.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../styles/AdminProductos.css";

const API_ENVIOS = "/api/envios";

export default function AdminEnvios() {
  const [envios, setEnvios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarEnvios();
  }, []);

  const cargarEnvios = async () => {
    try {
      setLoading(true);
      setMensaje("");

      const resp = await apiClient.get(API_ENVIOS);
      const data = Array.isArray(resp.data) ? resp.data : [];

      setEnvios(data);
    } catch (e) {
      console.error("Error al cargar envíos", e);
      setMensaje("Error al cargar envíos");
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return fecha.replace("T", " ").substring(0, 19);
  };

  const obtenerEstadoBadge = (estado) => {
    if (!estado) return "badge-estado";
    const lower = estado.toLowerCase();
    if (lower === "despachado") return "badge-estado badge-enviado";
    return `badge-estado badge-${lower}`;
  };

  const marcarEnviado = async (envio) => {
    const idPedido = envio.idPedido ?? envio.id;

    if (!window.confirm(`¿Marcar el pedido ${idPedido} como ENVIADO?`)) return;

    try {
      setMensaje("");
      await apiClient.post(`${API_ENVIOS}/${idPedido}/enviar`);
      setMensaje(`Pedido ${idPedido} marcado como ENVIADO`);
      await cargarEnvios();
    } catch (e) {
      console.error("Error al marcar envío", e);
      setMensaje("No se pudo marcar como enviado");
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Gestión de envíos</h2>
        {mensaje && <span className="admin-msg">{mensaje}</span>}
      </div>

      <div className="admin-card admin-card-envios">
        <div className="envios-intro">
          <p>
            Aquí puedes revisar los pedidos listos para despacho y marcar
            aquellos que ya fueron enviados al cliente.
          </p>
        </div>

        {loading ? (
          <p>Cargando envíos...</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table envios-table">
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Fecha envío</th>
                  <th>Estado</th>
                  <th>Comentario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {envios.length > 0 ? (
                  envios.map((e) => {
                    const idPedido = e.idPedido ?? e.id;
                    const estado = e.estado || "CREADO";

                    return (
                      <tr key={e.id}>
                        <td>{idPedido}</td>
                        <td>{formatearFecha(e.fechaEnvio)}</td>
                        <td>
                          <span className={obtenerEstadoBadge(estado)}>
                            {estado}
                          </span>
                        </td>
                        <td>{e.comentario || "-"}</td>
                        <td className="acciones">
                          {estado !== "DESPACHADO" ? (
                            <button
                              type="button"
                              className="btn-small btn-primary-soft"
                              onClick={() => marcarEnviado(e)}
                            >
                              Marcar enviado
                            </button>
                          ) : (
                            <span className="estado-texto-ok">Enviado</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      No hay pedidos pendientes de envío.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
