import "../hojaestilo/AdminHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { ContenedorPrincipal } from "../components/ContenedorPrincipal";

const AdminHome = () => {
  return (
    <div className="Admin">
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
      <ContenedorPrincipal
        texto1_Admin="Bienvenido administrador"
        imagen="admin"
        texto2_Admin="¿Qué deseas hacer?"
      />
    </div>
  );
};

export default AdminHome;
