import "../hojaestilo/OperadorHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { ContenedorOperador } from "../components/ContenedorOperador";

const OperadorHome = () => {
  return (
    <div className="Operador">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand">
          <img
            src={logo}
            width="30"
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
      <ContenedorOperador
        texto1_Operador="Bienvenido operador"
        imagen="Operador"
        texto2_Operador="¿Qué deseas hacer?"
      />
    </div>
  );
};

export default OperadorHome;
