// src/Paginas/Carrito.js
import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { crearPedido } from "../api/orderApi";
import "../styles/Catalogo.css";

function Carrito() {
  const { items, eliminarDelCarrito, vaciarCarrito, total } = useCarrito();
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [resumen, setResumen] = useState(null); // 👈 nuevo estado

  const handleConfirmar = async () => {
    if (items.length === 0) {
      setMensaje("El carrito está vacío.");
      setResumen(null);
      return;
    }

    try {
      setEnviando(true);
      setMensaje("");
      setResumen(null);

      const pedido = await crearPedido(items);

      // Calculamos subtotal, iva y total a partir de la respuesta
      const detalles = pedido.detalles || [];

      const subtotal = detalles.reduce(
        (acc, d) => acc + (d.subtotal ?? d.precioUnitario * d.cantidad),
        0
      );

      const iva = detalles.reduce(
        (acc, d) => acc + (d.iva ?? 0),
        0
      );

      const totalPedido =
        pedido.totalPedido ??
        detalles.reduce(
          (acc, d) => acc + (d.totalDetalle ?? d.subtotal + (d.iva ?? 0)),
          0
        );

      setResumen({
        subtotal,
        iva,
        total: totalPedido,
      });

      // vaciamos carrito
      vaciarCarrito();

      setMensaje(`✅ Pedido creado con ID ${pedido.idPedido}`);
    } catch (e) {
      console.error(e);
      setMensaje("❌ Error al crear el pedido. Intenta nuevamente.");
      setResumen(null);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="catalogo-wrapper">
      <h2 className="catalogo-titulo">Carrito de compras</h2>

      {(mensaje || resumen) && (
        <div
          style={{
            marginBottom: "16px",
            padding: "10px 14px",
            borderRadius: "6px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeeba",
            color: "#856404",
          }}
        >
          {mensaje && <div>{mensaje}</div>}

          {resumen && (
            <div style={{ marginTop: "6px", fontSize: "0.95rem" }}>
              <div>
                <strong>Subtotal:</strong>{" "}
                {resumen.subtotal.toLocaleString("es-CL")} CLP
              </div>
              <div>
                <strong>IVA:</strong>{" "}
                {resumen.iva.toLocaleString("es-CL")} CLP
              </div>
              <div>
                <strong>Total:</strong>{" "}
                {resumen.total.toLocaleString("es-CL")} CLP
              </div>
            </div>
          )}
        </div>
      )}

      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="productos-lista">
            {items.map((it) => (
              <li className="producto-row" key={it.id}>
                <div className="producto-textos">
                  <div className="producto-linea">
                    <strong>{it.nombre}</strong>
                  </div>
                  <div className="producto-descripcion">
                    Cantidad: {it.cantidad}
                  </div>
                  <div className="producto-precio">
                    Subtotal:{" "}
                    {(it.precio * it.cantidad).toLocaleString("es-CL")} CLP
                  </div>
                </div>

                <button
                  className="btn-agregar"
                  onClick={() => eliminarDelCarrito(it.id)}
                  type="button"
                >
                  Dejarlo
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "16px" }}>
            Total: {total.toLocaleString("es-CL")} CLP
          </h3>

          <button
            className="btn-agregar"
            style={{ marginTop: "16px", width: "100%" }}
            onClick={handleConfirmar}
            disabled={enviando}
          >
            {enviando ? "Enviando pedido..." : "Confirmar pedido"}
          </button>
        </>
      )}
    </div>
  );
}

export default Carrito;
