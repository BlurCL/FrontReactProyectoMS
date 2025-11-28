// src/Paginas/AdminOrdenes.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";   // 👈 NUEVO
import "../styles/AdminProductos.css"; // reutilizamos estilos del panel

const API_PEDIDOS = "/api/pedidos";
const API_FACTURAS = "/api/facturas";

export default function AdminOrdenes() {
  const { token } = useAuth();                      // 👈 NUEVO: token JWT

  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [pedidoAbierto, setPedidoAbierto] = useState(null); // para ver detalles
  const [loading, setLoading] = useState(false);

  // ===== CARGA INICIAL =====
  useEffect(() => {
    if (!token) return; // esperamos a tener token cargado
    cargarPedidos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const cargarPedidos = async () => {
    try {
      setLoading(true);

      const resp = await apiClient.get(API_PEDIDOS, {
        headers: {
          Authorization: `Bearer ${token}`,        // 👈 AQUÍ EL TOKEN
        },
      });

      const data = Array.isArray(resp.data)
        ? resp.data
        : Array.isArray(resp.data.content)
        ? resp.data.content
        : Object.values(resp.data || {});

      setPedidos(data);
    } catch (e) {
      console.error("Error al cargar pedidos", e);
      setMensaje("Error al cargar órdenes");
    } finally {
      setLoading(false);
    }
  };

  // ===== EMITIR FACTURA =====
  const emitirFactura = async (pedido) => {
    const id = pedido.id ?? pedido.idPedido;

    if (!window.confirm(`¿Emitir factura para el pedido ${id}?`)) return;

    try {
      setMensaje("");
      await apiClient.post(
        `${API_FACTURAS}/emitir/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,      // 👈 TAMBIÉN AQUÍ
          },
        }
      );
      setMensaje(`Factura emitida para el pedido ${id}`);
      await cargarPedidos(); // el estado pasa a FACTURADO
    } catch (e) {
      console.error("Error al emitir factura", e);
      setMensaje("No se pudo emitir la factura");
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    // viene tipo "2025-11-26T11:43:07.156317"
    return fecha.replace("T", " ").substring(0, 19);
  };

  const toggleDetalles = (id) => {
    setPedidoAbierto((prev) => (prev === id ? null : id));
  };

  const obtenerEstadoBadge = (estado) => {
    if (!estado) return "badge-estado";
    const lower = estado.toLowerCase();
    return `badge-estado badge-${lower}`;
  };

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Administrar órdenes</h2>
        {mensaje && <span className="admin-msg">{mensaje}</span>}
      </div>

      <div className="admin-card">
        <h3>Listado de órdenes</h3>

        {loading ? (
          <p>Cargando órdenes...</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>ID Usuario</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.length > 0 ? (
                  pedidos.map((p) => {
                    const id = p.id ?? p.idPedido;
                    const estado = p.estadoPedido;
                    return (
                      <React.Fragment key={id}>
                        <tr>
                          <td>{id}</td>
                          <td>{formatearFecha(p.fechaPedido)}</td>
                          <td>{p.idUsuario}</td>
                          <td>{p.totalPedido}</td>
                          <td>
                            <span className={obtenerEstadoBadge(estado)}>
                              {estado}
                            </span>
                          </td>
                          <td className="acciones">
                            <button
                              type="button"
                              className="btn-small"
                              onClick={() => toggleDetalles(id)}
                            >
                              {pedidoAbierto === id
                                ? "Ocultar detalles"
                                : "Ver detalles"}
                            </button>

                            {estado !== "FACTURADO" && (
                              <button
                                type="button"
                                className="btn-small btn-primary-soft"
                                onClick={() => emitirFactura(p)}
                              >
                                Emitir factura
                              </button>
                            )}
                          </td>
                        </tr>

                        {pedidoAbierto === id && Array.isArray(p.detalles) && (
                          <tr className="fila-detalles">
                            <td colSpan="6">
                              <div className="detalles-pedido">
                                <h4>Detalle del pedido</h4>
                                <table className="detalles-table">
                                  <thead>
                                    <tr>
                                      <th>Producto</th>
                                      <th>Cantidad</th>
                                      <th>Precio unit.</th>
                                      <th>Subtotal</th>
                                      <th>IVA</th>
                                      <th>Total detalle</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {p.detalles.map((d, idx) => (
                                      <tr key={idx}>
                                        <td>{d.nombreProducto}</td>
                                        <td>{d.cantidad}</td>
                                        <td>{d.precioUnitario}</td>
                                        <td>{d.subtotal}</td>
                                        <td>{d.iva}</td>
                                        <td>{d.totalDetalle}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No hay órdenes registradas.
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
