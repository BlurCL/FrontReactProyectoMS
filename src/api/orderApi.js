// src/api/orderApi.js
import { API_BASE_URL } from "./config";

const ORDER_API_BASE = `${API_BASE_URL}/api/pedidos`;

// ✅ LO QUE YA TENÍAS (NO TOCAR)
export async function crearPedido(carrito) {
  const payload = {
    idUsuario: 1,
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
    console.error("❌ Error de red al llamar a /api/pedidos:", e);
    throw new Error("No se pudo conectar con el servicio de pedidos.");
  }

  const rawBody = await resp.text();
  console.log("PEDIDO POST status:", resp.status, rawBody);

  if (!resp.ok) {
    throw new Error(`Error al crear pedido: ${resp.status}`);
  }

  if (!rawBody) return {};
  try {
    return JSON.parse(rawBody);
  } catch (e) {
    console.warn("⚠️ Respuesta crearPedido no es JSON válido:", rawBody);
    return {};
  }
}

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
  console.log("PEDIDOS GET status:", resp.status, rawBody);

  if (!resp.ok) {
    throw new Error(`Error al obtener pedidos: ${resp.status}`);
  }

  if (!rawBody) return [];
  try {
    return JSON.parse(rawBody);
  } catch (e) {
    console.warn("⚠️ Respuesta getPedidos no es JSON válido:", rawBody);
    return [];
  }
}

// ✅ NUEVO: pedidos activos para el TRABAJADOR
export async function getPedidosActivos(token) {
  let resp;
  try {
    resp = await fetch(`${ORDER_API_BASE}/activos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error("❌ Error de red al obtener pedidos activos:", e);
    throw new Error("No se pudo conectar con el servicio de pedidos.");
  }

  const rawBody = await resp.text();
  console.log("PEDIDOS ACTIVOS GET status:", resp.status, rawBody);

  if (!resp.ok) {
    throw new Error(`Error al obtener pedidos activos: ${resp.status}`);
  }

  if (!rawBody) return [];
  try {
    return JSON.parse(rawBody);
  } catch (e) {
    console.warn("⚠️ Respuesta getPedidosActivos no es JSON válido:", rawBody);
    return [];
  }
}

// ✅ NUEVO: marcar pedido como PREPARADO
export async function marcarPedidoPreparado(idPedido, token) {
  let resp;
  try {
    resp = await fetch(`${ORDER_API_BASE}/${idPedido}/preparar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error("❌ Error de red al marcar preparado:", e);
    throw new Error("No se pudo conectar con el servicio de pedidos.");
  }

  const rawBody = await resp.text();
  console.log("PEDIDO PREPARAR PUT status:", resp.status, rawBody);

  if (!resp.ok) {
    throw new Error(`Error al marcar preparado: ${resp.status}`);
  }

  if (!rawBody) return {};
  try {
    return JSON.parse(rawBody);
  } catch (e) {
    console.warn("⚠️ Respuesta marcarPedidoPreparado no es JSON válida:", rawBody);
    return {};
  }
}

// ✅ NUEVO: marcar pedido como ENVIADO
export async function marcarPedidoEnviado(idPedido, token) {
  let resp;
  try {
    resp = await fetch(`${ORDER_API_BASE}/${idPedido}/enviar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error("❌ Error de red al marcar enviado:", e);
    throw new Error("No se pudo conectar con el servicio de pedidos.");
  }

  const rawBody = await resp.text();
  console.log("PEDIDO ENVIAR PUT status:", resp.status, rawBody);

  if (!resp.ok) {
    throw new Error(`Error al marcar enviado: ${resp.status}`);
  }

  if (!rawBody) return {};
  try {
    return JSON.parse(rawBody);
  } catch (e) {
    console.warn("⚠️ Respuesta marcarPedidoEnviado no es JSON válida:", rawBody);
    return {};
  }
}
