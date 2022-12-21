import "../hojaestilo/ClienteHome.css";
import logo from "../Images/logo-2.png";
import { Link } from "react-router-dom";
import { ContenedorCliente } from "../components/ContenedorCliente";

import React from "react";

const ClienteHome = () => {
  return (
    <div class="contenedor-inicialCliente">
      <div className="Cliente">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
            <Link to="/SignIn" className="btn btn-light btn-lg">
              Cerrar sesión
            </Link>
          </ul>
        </nav>
        <ContenedorCliente
          texto1_Cliente="Bienvenido/a"
          imagen="cliente"
          texto2_Cliente="¿Qué deseas hacer?"
        />
      </div>
    </div>
  );
};

export default ClienteHome;
