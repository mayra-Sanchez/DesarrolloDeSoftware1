import "../hojaestilo/PagoFacturas.css";
import logo from "../Images/logo-2.png";
import { Link } from "react-router-dom";
import React from "react";
import { ContenedorCliente } from "../components/ContenedorCliente.jsx";

const PagoFacturas = () => {
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
        <ContenedorCliente/>
        <div className="boton-home">
          <Link to="/Cliente" className="btn btn-success btn-lg">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagoFacturas;
