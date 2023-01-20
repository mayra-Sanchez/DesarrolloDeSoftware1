import "../hojaestilo/ConsumoCliente.css";
import React from "react";
import logo from "../Images/logo-2.png";
import { Link } from "react-router-dom";

const ConsumoCliente = () => {

    return (
    <div class="contenedor-inicialGerente">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand">
          <img
            src={logo}
            width="50"
            height="30"
            class="d-inline-block align-top"
            alt="logo"
          />
          SIGEIN
        </div>
        <ul class="navbar-nav ml-auto">
          <Link to="/SignIn" className="btn btn-light btn-lg">
            Cerrar sesión
          </Link>
        </ul>
      </nav>

      
        <div className="boton-home">
          <Link to="/Gerente" className="btn btn-success btn-lg">
            Volver
          </Link>
        </div>

    </div>
  );
};

export default ConsumoCliente;
