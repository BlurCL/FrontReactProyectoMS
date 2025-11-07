// src/Paginas/Catalogo.js
import React, { useMemo } from "react";
import "../styles/Catalogo.css";

function Catalogo() {
  const productos = [
    { id: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000 },
    { id: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000 },
    { id: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000 },
    { id: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", precio: 42000 },
    { id: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", precio: 5000 },
    { id: "PI002", categoria: "Postres Individuales", nombre: "Tiramisú Clásico", precio: 5500 },
    { id: "PSA001", categoria: "Productos Sin Azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000 },
    { id: "PSA002", categoria: "Productos Sin Azúcar", nombre: "Cheesecake Sin Azúcar", precio: 47000 },
    { id: "PT001", categoria: "Pastelería Tradicional", nombre: "Empanada de Manzana", precio: 3000 },
    { id: "PT002", categoria: "Pastelería Tradicional", nombre: "Tarta de Santiago", precio: 6000 },
    { id: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000 },
    { id: "PG002", categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", precio: 3500 },
    { id: "PV001", categoria: "Productos Vegana", nombre: "Torta Vegana de Chocolate", precio: 50000 },
    { id: "PV002", categoria: "Productos Vegana", nombre: "Galletas Veganas de Avena", precio: 4500 },
    { id: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000 },
    { id: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", precio: 60000 },
  ];

  // Agrupar por categoría para render similar a tu captura
  const agrupado = useMemo(() => {
    return productos.reduce((acc, p) => {
      (acc[p.categoria] = acc[p.categoria] || []).push(p);
      return acc;
    }, {});
  }, [productos]);

  const agregarAlCarrito = (producto) => {
    // aquí luego puedes conectar con contexto/Redux o tu backend
    alert(`Agregado: ${producto.id} - ${producto.nombre}`);
  };

  return (
    <div className="catalogo-wrapper">
      <h2 className="catalogo-titulo">Catálogo de Productos</h2>

      {Object.entries(agrupado).map(([categoria, items]) => (
        <section className="categoria-card" key={categoria}>
          <header className="categoria-header">{categoria}</header>

          <ul className="productos-lista">
            {items.map((p, idx) => (
              <li className="producto-row" key={p.id}>
                <div className="producto-textos">
                  <div className="producto-linea">
                    <strong>{p.id}</strong> &nbsp;-&nbsp; {p.nombre}
                  </div>
                  <div className="producto-precio">
                    {p.precio.toLocaleString("es-CL")} CLP
                  </div>
                </div>

                <button
                  className="btn-agregar"
                  onClick={() => agregarAlCarrito(p)}
                  type="button"
                >
                  Agregar al Carrito
                </button>

                {/* separador entre productos, excepto el último */}
                {idx !== items.length - 1 && <hr className="producto-divider" />}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Catalogo;










/* cambiar el catalogo por el mismo que tengo en html */