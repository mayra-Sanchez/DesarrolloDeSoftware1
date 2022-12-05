import "../hojaestilo/AdminHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { ContenedorPrincipal } from "../components/ContenedorPrincipal";

const AdminHome = () => {
  return (
    <div className="Admin">
      <header className="Admin-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <ContenedorPrincipal
        texto1="Bienvenido administrador"
        imagen="admin"
        texto2="¿Qué deseas hacer?"
      />
    </div>
  );
};

export default AdminHome;
