import "../hojaestilo/GerenteHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { ContenedorGerente } from "../components/ContenedorGerente";

const GerenteHome = () => {
  return (
    <div className="Gerente">
      <header className="Gerente-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <ContenedorGerente
        texto1="Bienvenido gerente"
        imagen="Gerente"
        texto2="¿Qué deseas hacer?"
      />
    </div>
  );
};

export default GerenteHome;
