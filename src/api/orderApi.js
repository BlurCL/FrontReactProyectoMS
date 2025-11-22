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

  let resp;
  try {
    resp = await fetch(ORDER_API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("❌ Error de red al llamar a ms-order:", e);
    throw new Error("No se pudo conectar con el servicio de pedidos.");
  }

  const rawBody = await resp.text();
  console.log("🔎 Respuesta de /api/pedidos (POST):", resp.status, rawBody);

  if (!resp.ok) {
    throw new Error(`Error al crear pedido: ${resp.status}`);
  }

  if (!rawBody) return {};

  try {
    return JSON.parse(rawBody);
  } catch (e) {
    console.warn("⚠️ La respuesta de crearPedido no es JSON válido:", rawBody);
    return {};
  }
}

// 🔹 obtener todos los pedidos (para AdminDashboard)
export async function getPedidos() {
  let resp;
  try {
    resp = await fetch(ORDER_API_BASE, {
      method: "GET",
    });
  } catch (e) {
    console.error("❌ Error de red al obtener pedidos:", e);
    throw new Error("No se pudo conectar con el servicio de pedidos.");
  }

  const rawBody = await resp.text();
  console.log("🔎 Respuesta de /api/pedidos (GET):", resp.status, rawBody);

  if (!resp.ok) {
    throw new Error(`Error al obtener pedidos: ${resp.status}`);
  }

  if (!rawBody) return [];

  try {
    return JSON.parse(rawBody);
  } catch (e) {
    console.warn("⚠️ La respuesta de getPedidos no es JSON válido:", rawBody);
    return [];
  }
}
