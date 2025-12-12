// spec/carritoUtils.js

function calcularSubtotal(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function calcularTotalConIVA(items, iva = 0.19) {
  const subtotal = calcularSubtotal(items);
  return subtotal + subtotal * iva;
}

// Exponer funciones para que Jasmine pueda usarlas
if (typeof window !== "undefined") {
  window.calcularSubtotal = calcularSubtotal;
  window.calcularTotalConIVA = calcularTotalConIVA;
}
