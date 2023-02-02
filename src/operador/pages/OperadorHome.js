import "../hojaestilo/OperadorHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { ContenedorOperador } from "../components/ContenedorOperador";

const OperadorHome = () => {
  return (
    <div class="contenedor-inicialOperador">
      <div className="Operador">
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
        <ContenedorOperador
          texto1_Operador="Bienvenido operador"
          imagen="operador"
          texto2_Operador="¿Qué deseas hacer?"
        />
      </div>
    </div>
  );
};

export default OperadorHome;
