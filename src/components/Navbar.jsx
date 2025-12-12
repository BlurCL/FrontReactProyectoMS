import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import CerrarSesion from "../components/CerrarSesion";

function Navbar() {
  const { items } = useCarrito();
  const { token } = useAuth(); 
  const cantidadTotal = items.reduce((acc, it) => acc + it.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Pastelería Mil Sabores🍰</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio</Link></li>
              
              <li className="nav-item">
              <Link className="nav-link" to="/catalogo-api">
                Catálogo</Link></li>
              
              <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito {cantidadTotal > 0 && `(${cantidadTotal})`}</Link></li>

            
            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/login">
                  Acceso funcionario
                </Link>
              </li>
            )}

           
            {token && (
              <li className="nav-item ms-3">
                <CerrarSesion />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
