import React, { useEffect, useState } from "react";
import { getProductos } from "../api/productosApi";
import "../styles/Catalogo.css";

import imgTortaChocolate from "../img/torta-chocolate.jpg";
import imgTortaPina from "../img/torta-pina.jpg";
import imgTortaMilhojas from "../img/torta-milhojas.jpg";
import imgTortaFrutillas from "../img/torta-frutillas.jpg";
import imgDefault from "../img/torta1.jpg";

import { useCarrito } from "../context/CarritoContext";

const CATEGORIAS_POR_ID = {
  7: "Tortas Cuadradas",
  8: "Tortas Circulares",
};

const IMAGENES_POR_ID = {
  "202": imgTortaChocolate,
  "203": imgTortaPina,
  "204": imgTortaMilhojas,
  "205": imgTortaFrutillas,
};

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await getProductos();

        const normalizados = data.map((p) => {
          const codigo = String(p.codigoProducto || p.id || p.codigo);

          return {
            id: codigo,
            nombre: p.nombreProducto,
            descripcion: p.descripcionProducto,
            precio: p.precioProducto,
            categoriaId: p.categoriaId,
            categoria: CATEGORIAS_POR_ID[p.categoriaId] || "Sin categoría",
            imagen: IMAGENES_POR_ID[codigo] || imgDefault,
          }; });

        setProductos(normalizados);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p className="catalogo-error">{error}</p>;

  const agrupado = productos.reduce((acc, p) => {
    (acc[p.categoria] = acc[p.categoria] || []).push(p);
    return acc;
  }, {});

  return (
    <div className="catalogo-wrapper">
      <h2 className="catalogo-titulo">Catálogo de productos</h2>

      {Object.entries(agrupado).map(([categoria, items]) => (
        <section className="categoria-card" key={categoria}>
          <header className="categoria-header">{categoria}</header>

          <ul className="productos-lista">
            {items.map((p, index) => (
              <li className="producto-row" key={p.id}>
                <div className="producto-imagen-wrapper">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="producto-imagen"
                  />
                </div>

                <div className="producto-contenido">
                  <div className="producto-textos">
                    <div className="producto-linea">
                      <strong>{p.id}</strong> &nbsp;-&nbsp; {p.nombre}
                    </div>

                    {p.descripcion && (
                      <div className="producto-descripcion">
                        {p.descripcion}
                      </div>)}
                      <div className="producto-precio">
                      {p.precio.toLocaleString("es-CL")} CLP
                    </div></div>

                  <button
                    className="btn-agregar"
                    type="button"
                    onClick={() =>
                      agregarAlCarrito({id: p.id, nombre: p.nombre,precio: p.precio,})}>
                    Agregar al Carrito
                  </button></div>

                {index !== items.length - 1 && (
                  <hr className="producto-divider" />)}</li>))}</ul>
                </section>))}</div>
  );
}

export default Catalogo;
