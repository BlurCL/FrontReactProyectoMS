import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

// 👇 hook para usar el contexto en cualquier componente
export const useCarrito = () => useContext(CarritoContext);

// 👇 provider que envuelve la app
export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const agregarAlCarrito = (producto) => {
    setItems((prev) => {
      const existe = prev.find((it) => it.id === producto.id);
      if (existe) {
        return prev.map((it) =>
          it.id === producto.id
            ? { ...it, cantidad: it.cantidad + 1 }
            : it
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // 👇 quitamos un producto por id (nombre que usa Carrito.js)
  const quitarDelCarrito = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // alias con el nombre antiguo por si lo usas en otro lado
  const eliminarDelCarrito = quitarDelCarrito;

  // 👇 limpiamos todo el carrito (nombre que usa Carrito.js)
  const limpiarCarrito = () => setItems([]);

  // alias con el nombre antiguo
  const vaciarCarrito = limpiarCarrito;

  const total = items.reduce(
    (acc, it) => acc + it.precio * it.cantidad,
    0
  );

  const value = {
    items,
    agregarAlCarrito,
    quitarDelCarrito,
    eliminarDelCarrito,
    limpiarCarrito,
    vaciarCarrito,
    total,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

// opcional: también lo exportamos como default por si acaso
export default CarritoProvider;
