// spec/carritoUtils.spec.js

describe("Pruebas unitarias del carrito en el Frontend", function () {

  it("calcula correctamente el subtotal", function () {
    const items = [
      { nombre: "Torta chocolate", precio: 10000, cantidad: 1 },
      { nombre: "Cheesecake", precio: 7000, cantidad: 2 }
    ];

    const subtotal = calcularSubtotal(items);

    expect(subtotal).toBe(10000 + 7000 * 2);
  });

  it("calcula correctamente el total con IVA", function () {
    const items = [
      { nombre: "Torta 1", precio: 10000, cantidad: 1 },
      { nombre: "Torta 2", precio: 5000, cantidad: 1 }
    ];

    const total = calcularTotalConIVA(items, 0.19);
    const esperado = (10000 + 5000) * 1.19;

    expect(total).toBeCloseTo(esperado, 2);
  });

  it("retorna 0 cuando el carrito está vacío", function () {
    const items = [];

    const subtotal = calcularSubtotal(items);

    expect(subtotal).toBe(0);
  });

});
