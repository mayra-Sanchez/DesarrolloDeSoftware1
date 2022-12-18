import "../hojaestilo/GerenteHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { ContenedorGerente } from "../components/ContenedorGerente";

const GerenteHome = () => {
  return (
    <div className="Gerente">
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <a class="navbar-brand">
          <img
            src={logo}
            width="50"
            height="30"
            class="d-inline-block align-top"
            alt="logo"
          />
          SIGEIN
        </a>
        <ul class="navbar-nav ml-auto">
          <a class="nav-item nav-link" href="#">
            Cerrar sesion
          </a>
        </ul>
      </nav>
      <ContenedorGerente
        texto1_Gerente="Bienvenido gerente"
        imagen="Gerente"
        texto2_Gerente="¿Qué deseas hacer?"
      />
    </div>
  );
};

export default GerenteHome;
