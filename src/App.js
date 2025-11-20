import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import RecetaEnamorados from "./Recetas/RecetaEnamorados";
import RecetaChocolate from "./Recetas/RecetaChocolate";
import RecetaPremium from "./Recetas/RecetaPremium";
import Registrarse from "./Paginas/Registrarse";
import Catalogo from "./Paginas/Catalogo";
import Home from "./Paginas/Home";
import "./App.css";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/receta-enamorados" element={<RecetaEnamorados />} />
        <Route path="/receta-chocolate" element={<RecetaChocolate />} />
        <Route path="/receta-premium" element={<RecetaPremium />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;






