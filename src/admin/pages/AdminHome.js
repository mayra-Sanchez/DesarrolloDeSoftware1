import "../hojaestilo/AdminHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { ContenedorPrincipal } from "../components/ContenedorPrincipal";

const AdminHome = () => {
  return (
    <div className="Admin">
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
      <ContenedorPrincipal
        texto1_Admin="Bienvenido administrador"
        imagen="admin"
        texto2_Admin="¿Qué deseas hacer?"
      />
    </div>
  );
};

export default AdminHome;
