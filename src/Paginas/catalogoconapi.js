import React, { useEffect, useState } from "react";
import { getProductos } from "../api/productosApi";

function Catalogoconapi() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await getProductos();
        console.log("Respuesta de /api/productos:", data);
        setProductos(data); // data es el array de productos
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="catalogo-container">
      <h1>Catálogo (con API)</h1>
      <div className="catalogo-grid">
        {productos.map((p) => (
          <div key={p.id} className="card-producto">
            <h3>{p.nombreProducto}</h3>
            <p>{p.descripcionProducto}</p>
            <p>Precio: ${p.precioProducto}</p>
            {/* Si quieres mostrar la categoría: */}
            {/* <small>Categoría ID: {p.categoriaId}</small> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogoconapi;
