// src/Paginas/AdminFacturas.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { API_BASE_URL } from "../api/config";
import "../styles/AdminProductos.css"; // reutilizamos estilos del panel

const API_FACTURAS = "/api/facturas";

export default function AdminFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarFacturas();
  }, []);

  const cargarFacturas = async () => {
    try {
      setLoading(true);
      const resp = await apiClient.get(API_FACTURAS);

      const data = Array.isArray(resp.data)
        ? resp.data
        : Array.isArray(resp.data.content)
        ? resp.data.content
        : Object.values(resp.data || {});

      setFacturas(data);
    } catch (e) {
      console.error("Error al cargar facturas", e);
      setMensaje("Error al cargar facturas");
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return fecha.replace("T", " ").substring(0, 19);
  };

  const verPdf = (idFactura) => {
    const url = `${API_BASE_URL}${API_FACTURAS}/${idFactura}/pdf`;
    window.open(url, "_blank");
  };

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Facturas emitidas</h2>
        {mensaje && <span className="admin-msg">{mensaje}</span>}
      </div>

      <div className="admin-card admin-card-facturas">
        <div className="facturas-intro">
          <p>
            Aquí puedes revisar todas las facturas generadas a partir de los
            pedidos y descargar el PDF correspondiente.
          </p>
        </div>

        {loading ? (
          <p>Cargando facturas...</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table facturas-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>N° Factura</th>
                  <th>ID Pedido</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {facturas.length > 0 ? (
                  facturas.map((f) => (
                    <tr key={f.id}>
                      <td>{f.id}</td>
                      <td className="factura-numero">{f.numeroFactura}</td>
                      <td>{f.pedidoId}</td>
                      <td className="factura-fecha">
                        {formatearFecha(f.fechaEmision)}
                      </td>
                      <td className="factura-total">{f.total}</td>
                      <td>
                        <span className="badge-estado badge-facturado">
                          {f.estado}
                        </span>
                      </td>
                      <td className="acciones">
                        <button
                          type="button"
                          className="btn-small btn-pdf"
                          onClick={() => verPdf(f.id)}
                        >
                          Ver PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-row">
                      Aún no hay facturas emitidas.
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
