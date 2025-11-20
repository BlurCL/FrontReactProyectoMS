import React, { useState } from "react";
import "../styles/Registrarse.css"; // Archivo CSS opcional

function RegistroUsuario() {
  // Estado del formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    edad: "",
    correo: "",
    contrasena: ""
  });

  // Manejar cambios en los inputs
  const manejarCambio = (evento) => {
    setFormulario({
      ...formulario,
      [evento.target.name]: evento.target.value
    });
  };

  // Manejar envío del formulario
  const manejarEnvio = (evento) => {
    evento.preventDefault();

    console.log("Datos enviados:", formulario);

    // Aquí podrías enviar los datos al backend más adelante:
    // fetch("http://localhost:8080/usuarios", { ... })
  };

  return (
    <div className="registro-contenedor">
      <h2>Registro de Usuario</h2>

      <form onSubmit={manejarEnvio} className="registro-formulario">

        {/* Nombre */}
        <div className="grupo-formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />
        </div>

        {/* Edad */}
        <div className="grupo-formulario">
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formulario.edad}
            onChange={manejarCambio}
            min="1"
            required
          />
        </div>

        {/* Correo */}
        <div className="grupo-formulario">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formulario.correo}
            onChange={manejarCambio}
            required
          />
        </div>

        {/* Contraseña */}
        <div className="grupo-formulario">
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formulario.contrasena}
            onChange={manejarCambio}
            required
          />
        </div>

        <button type="submit" className="btn-registrarse">
          Registrarse
        </button>

      </form>
    </div>
  );
}

export default RegistroUsuario;

