import "../hojaestilo/GestionarUsuarios.css";
import logo from "../Images/logo-2.png";
import icono from "../Images/flecha.png";
import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="Admin-Gestion">
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
      <div className="contenedor-botones">
        <br />
        <div className="boton1">
          <Link
            to="/Admin/Gestion-usuarios/Registrar-usuarios"
            className="btn btn-light btn-lg mb-5"
          >
            <img src={icono} clasname="imagen" alt="logo" />
            Registrar usuarios
          </Link>
        </div>
        <br />
        <div className="boton2">
          <Link
            to="/Admin/Gestion-usuarios/Autenticar-usuarios"
            className="btn btn-light btn-lg mb-10"
          >
            <img src={icono} clasname="imagen" alt="logo" />
            Autenticar usuarios
          </Link>
        </div>
        <br />
        <div className="boton3">
          <Link
            to="/Admin/Gestion-usuarios/Consultar-informacion"
            className="btn btn-light btn-lg mb-10"
          >
            <img src={icono} clasname="imagen" alt="logo" />
            Consultar informacion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
