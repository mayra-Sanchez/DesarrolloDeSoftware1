import "../hojaestilo/GerenteHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { ContenedorGerente } from "../components/ContenedorGerente";

const GerenteHome = () => {
  return (
    <div class="contenedor-inicialGerente">
      <div className="Gerente">
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
        <ContenedorGerente
          texto1_Gerente="Bienvenido gerente"
          imagen="Gerente"
          texto2_Gerente="¿Qué deseas hacer?"
        />
      </div>
    </div>
  );
};

export default GerenteHome;
