import React from "react";
import "../styles/Home.css";
import torta1 from "../img/torta1.jpg";
import torta22 from "../img/torta22.jpg";
import torta3 from "../img/torta3.jpg";
import { Link } from "react-router-dom";


function Home() {
  return (
    <main className="home">
      {/* Sección Hero */}
      <section className="hero">
        <h1>Bienvenido</h1>
        <p>
          Pastelería artesanal con ingredientes frescos, diseños únicos y el
          sabor que endulza tus momentos.
        </p>
        <a className="btn-catalogo" href="/catalogo-api">
          Ver Catálogo
        </a>
        <></>
      </section>

      <p>
          Descubre las mejores recetas para preparar en casa con solo un clic!!
        </p>

      
      <section className="image-container">
        

          <Link to="/receta-premium">

        <div className="image-card">
        <img src={torta1} alt="Pastel 1" />
          <h3>Torta Premium</h3>
        </div>
        </Link>






      <Link to="/receta-enamorados">

        <div className="image-card">
        <img src={torta22} alt="Pastel 2" />
          <h3>Torta Enamorados</h3>
        </div>
        </Link>

          <Link to="/receta-chocolate">

        <div className="image-card">
        <img src={torta3} alt="Pastel 3" />
          <h3>Torta Enamorados</h3>
        </div>
        </Link>


        
      </section>

      {/* Sección informativa antes del footer */}
      <section className="info">
        <h2>50 años endulzando la vida de los Chilenos</h2>
        <p>
          Elaboramos nuestros productos con dedicación y cariño, ofreciendo una
          experiencia dulce y memorable en cada bocado.
        </p>
      </section>
    </main>
  );
}

export default Home;

