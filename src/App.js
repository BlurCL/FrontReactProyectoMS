import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Registrarse from "./Paginas/Registrarse";
import Catalogo from "./Paginas/Catalogo";
import Home from "./Paginas/Home"; // 👈 importar Home
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />   {/* 👈 reemplaza el h1 por Home */}
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


