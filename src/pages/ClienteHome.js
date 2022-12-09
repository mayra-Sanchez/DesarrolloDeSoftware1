import "../hojaestilo/ClienteHome.css";
import logo from "../Images/logo-2.png";
import { ContenedorCliente } from "../components/ContenedorCliente";

import React from "react";

const ClienteHome = () => {
    return (
        <div className="Cliente">
            <header className="Cliente-header">
                <img src={logo} className="app-logo" alt="logo" />
            </header>
            <ContenedorCliente
                texto1="Bienvenido/a"
                imagen="cliente"
                texto2="¿Qué deseas hacer?"
            />
        </div>
    );
};

export default ClienteHome;