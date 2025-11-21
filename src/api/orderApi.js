// src/api/orderApi.js

const ORDER_API_BASE = "http://localhost:8081/api/pedidos"; // ms-order

export async function crearPedido(carrito) {
  const payload = {
    idUsuario: 1, // "Cliente Web"
    detalles: carrito.map((item) => ({
      idProducto: item.id,
      nombreProducto: item.nombre,
      precioUnitario: item.precio,
      cantidad: item.cantidad,
    })),
  };

  const resp = await fetch(ORDER_API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(`Error al crear pedido: ${resp.status}`);
  }

  return await resp.json();
}
