import "../hojaestilo/AdminHome.css";
import logo from "../Images/logo-2.png";
import AdminLogo from "../Images/admin.png";
import { Link } from "react-router-dom";
import React from "react";


const AdminHome = () => {
  return (
    <div className="Admin">
      <header className="Admin-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <div className="contenedor-admin">
        <h1 className="text-sm-center">Bienvenido administrador</h1>
        <img src={AdminLogo} className="admin-logo" alt="adminLogo" />
        <h2>¿Qué deseas hacer?</h2>
        <Link
          to="/Admin/Gestion-usuarios"
          className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3"
        >
          Gestionar usuarios
        </Link>
        <Link
          to="/Admin/Configuracion-sistema"
          className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3"
        >
          Configurar el sistema
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
