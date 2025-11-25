// src/api/orderApi.js
import { API_BASE_URL } from "./config";

const ORDER_API_BASE = `${API_BASE_URL}/api/pedidos`;

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
        // si después proteges con JWT, acá va Authorization
        // Authorization: `Bearer ${token}`,
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
