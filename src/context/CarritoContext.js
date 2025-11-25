import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);


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

  const quitarDelCarrito = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };


  const eliminarDelCarrito = quitarDelCarrito;

  const limpiarCarrito = () => setItems([]);

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


export default CarritoProvider;
