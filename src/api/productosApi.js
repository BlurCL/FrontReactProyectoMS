
import { API_BASE_URL } from "./config";

const PRODUCTOS_API_BASE = `${API_BASE_URL}/api/productos`;

export async function getProductos() {
  const response = await fetch(PRODUCTOS_API_BASE);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json(); 
}


export async function crearProducto({ nombre, descripcion, precio, categoriaId }) {
 
  const payload = {
    nombreProducto: nombre,
    descripcionProducto: descripcion,
    precioProducto: Number(precio),
    categoriaId: Number(categoriaId),
  };

  const resp = await fetch(PRODUCTOS_API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error("Error al crear producto");
  }

  return await resp.json();
}
