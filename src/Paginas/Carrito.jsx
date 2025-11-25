import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { crearPedido } from "../api/orderApi";
import "../styles/Catalogo.css"; 

function Carrito() {
  const { items, quitarDelCarrito, limpiarCarrito } = useCarrito();

  // estado del envío del pedido
  const [estadoEnvio, setEstadoEnvio] = useState("idle"); 
  const [mensajePedido, setMensajePedido] = useState(""); // se usa para errores
  const [ultimoPedidoId, setUltimoPedidoId] = useState(null);
  const [resumenPedido, setResumenPedido] = useState(null); // subtotal, iva, total

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
        <div className="carrito-success">
          <div className="carrito-success-header">
            <span className="carrito-success-icon">✅</span>
            <span>Pedido creado con ID {ultimoPedidoId}</span>
          </div>

          {resumenPedido && (
            <div className="carrito-success-body">
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
        <div className="carrito-error">
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
                    {(item.precio * item.cantidad).toLocaleString("es-CL")} CLP
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

          <div className="carrito-total">
            Total: {totalCarrito.toLocaleString("es-CL")} CLP
          </div>

          <button
            type="button"
            className="btn-agregar carrito-btn-confirmar"
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
