import "../hojaestilo/GerenteHome.css";
import logo from "../Images/logo-2.png";
import GerenteLogo from "../Images/Gerente.png";
import { Link } from "react-router-dom";
import React from "react";

const GerenteHome = () => {
    return (
        <div className="Gerente">
            <header className="Gerente-header">
                <img src={logo} className="app-logo" alt="logo" />
            </header>
            <div className="contenedor-gerente">
                <h1 className="text-sm-center">Bienvenido gerente</h1>
                <img src={GerenteLogo} className="gerente-logo" alt="gerenteLogo" />
                <h2>¿Qué deseas hacer?</h2>
                <Link
                    to="/Gerente/Buscador-de-clientes"
                    className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3"
                >
                    Buscador de clientes
                </Link>

                <Link to="/Gerente/Consultar-reportes" className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3">
                    Consultar reportes
                </Link>

                <Link to="/Gerente/Consultar-consumo-de-clientes" className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3">
                    Consultar consumo de clientes
                </Link>

                <Link to="/Gerente/Archivos-de-clientes" className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3">
                    Archivos de clientes
                </Link>

                <Link to="/Gerente/Generar-facturas-mensuales" className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3">
                    Generar facturas mensuales
                </Link>
            </div>
        </div>
    );
};

export default GerenteHome;