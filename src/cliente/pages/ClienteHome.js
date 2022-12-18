import "../hojaestilo/ClienteHome.css";
import logo from "../Images/logo-2.png";
import { ContenedorCliente } from "../components/ContenedorCliente";

import React from "react";

const ClienteHome = () => {
  return (
    <div className="Cliente">
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
      <ContenedorCliente
        texto1_Cliente="Bienvenido/a"
        imagen="cliente"
        texto2_Cliente="¿Qué deseas hacer?"
      />
    </div>
  );
};

export default ClienteHome;
