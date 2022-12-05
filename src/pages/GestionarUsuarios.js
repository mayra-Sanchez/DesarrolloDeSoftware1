import "../hojaestilo/GestionarUsuarios.css";
import logo from "../Images/logo-2.png";
import icono from "../Images/icono.png";
import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="Admin">
      <header className="Admin-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <div className="contenedor-botones">
        <div className="boton">
          <img src={icono} className="boton1" alt="logo" />
          <Link
            to="/Admin/Gestion-usuarios/Registrar-usuarios"
            className="btn btn-outline-dark btn-lg mb-5"
          >
            Registrar usuarios
          </Link>
        </div>
        <div className="boton">
          <img src={icono} className="boton2" alt="logo" />
          <Link
            to="/Admin/Gestion-usuarios/Autenticar-usuarios"
            className="btn btn-outline-dark btn-lg mb-5"
          >
            Autenticar usuarios
          </Link>
        </div>
        <div className="boton">
          <img src={icono} className="boton3" alt="logo" />
          <Link
            to="/Admin/Gestion-usuarios/Consultar-informacion"
            className="btn btn-outline-dark btn-lg mb-5"
          >
            Consultar informacion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
