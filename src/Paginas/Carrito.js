import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { crearPedido } from "../api/orderApi";

function Carrito() {
  const { items, quitarDelCarrito, limpiarCarrito } = useCarrito();

  // estado del envío del pedido
  const [estadoEnvio, setEstadoEnvio] = useState("idle"); // idle | enviando | ok | error
  const [mensajePedido, setMensajePedido] = useState("");  // lo usamos para errores
  const [ultimoPedidoId, setUltimoPedidoId] = useState(null);
  const [resumenPedido, setResumenPedido] = useState(null); // {subtotal, iva, total}

  const totalCarrito = items.reduce(
    (acc, it) => acc + it.precio * it.cantidad,
    0
  );

  const handleConfirmarPedido = async () => {
    if (items.length === 0) return;

    // tomamos el subtotal SIN IVA antes de limpiar el carrito
    const subtotalSinIVA = totalCarrito;

    setEstadoEnvio("enviando");
    setMensajePedido("");
    setUltimoPedidoId(null);
    setResumenPedido(null);

    try {
      const pedidoCreado = await crearPedido(items);

      // vaciamos el carrito SOLO con estado de React
      limpiarCarrito();

      const id = pedidoCreado?.idPedido ?? "(sin ID)";
      const totalConIVA = pedidoCreado?.totalPedido ?? subtotalSinIVA;
      const ivaCalculado = totalConIVA - subtotalSinIVA;

      setUltimoPedidoId(id);
      setResumenPedido({
        subtotal: subtotalSinIVA,
        iva: ivaCalculado,
        total: totalConIVA,
      });

      setEstadoEnvio("ok");
    } catch (err) {
      console.error(err);
      setEstadoEnvio("error");
      setMensajePedido(
        err?.message || "Hubo un problema al crear el pedido."
      );
    }
  };

  return (
    <div className="catalogo-wrapper">
      <h2 className="catalogo-titulo">Carrito de compras</h2>

      {/* Mensaje de éxito con resumen */}
      {estadoEnvio === "ok" && ultimoPedidoId && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "0.95rem",
            backgroundColor: "#fff3cd", // amarillo suave
            border: "1px solid #ffeeba",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            <span style={{ marginRight: "8px" }}>✅</span>
            <span>Pedido creado con ID {ultimoPedidoId}</span>
          </div>

          {resumenPedido && (
            <div>
              <div>
                <strong>Subtotal:</strong>{" "}
                {resumenPedido.subtotal.toLocaleString("es-CL")} CLP
              </div>
              <div>
                <strong>IVA:</strong>{" "}
                {resumenPedido.iva.toLocaleString("es-CL")} CLP
              </div>
              <div>
                <strong>Total:</strong>{" "}
                {resumenPedido.total.toLocaleString("es-CL")} CLP
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mensaje de error */}
      {estadoEnvio === "error" && mensajePedido && (
        <div
          style={{
            marginBottom: "12px",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.9rem",
            backgroundColor: "#ffebee",
            border: "1px solid #ef5350",
          }}
        >
          {mensajePedido}
        </div>
      )}

      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="productos-lista">
            {items.map((item) => (
              <li key={item.id} className="producto-row">
                <div className="producto-textos">
                  <strong>{item.nombre}</strong>
                  <div>Cantidad: {item.cantidad}</div>
                  <div>
                    Subtotal:{" "}
                    {(item.precio * item.cantidad).toLocaleString("es-CL")}{" "}
                    CLP
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => quitarDelCarrito(item.id)}
                >
                  Dejarlo
                </button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "16px", fontWeight: "bold" }}>
            Total: {totalCarrito.toLocaleString("es-CL")} CLP
          </div>

          <button
            type="button"
            className="btn-agregar"
            style={{ marginTop: "12px", width: "100%" }}
            onClick={handleConfirmarPedido}
            disabled={estadoEnvio === "enviando"}
          >
            {estadoEnvio === "enviando"
              ? "Enviando pedido..."
              : "Confirmar pedido"}
          </button>
        </>
      )}
    </div>
  );
}

export default Carrito;
