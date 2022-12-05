import "../hojaestilo/ClienteHome.css";
import logo from "../Images/logo-2.png";
import ClienteLogo from "../Images/cliente.gif";
import { Link } from "react-router-dom";
import React from "react";

const ClienteHome = () => {
    return (
        <div className="Cliente">
            <header className="Cliente-header">
                <img src={logo} className="app-logo" alt="logo" />
            </header>
            <div className="contenedor-cliente">
                <h1 className="text-sm-center">Bienvenido</h1>
                <img src={ClienteLogo} className="cliente-logo" alt="clienteLogo" />
                <h2>¿Qué deseas hacer?</h2>
                <Link
                    to="/Cliente/consumo-mensual"
                    className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3"
                >
                    Ver mi consumo mensual
                </Link>
                <Link
                    to="/Cliente/pagar-facturas-online"
                    className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3"
                >
                    Pagar mis facturas online 
                </Link>
                <Link
                    to="/Cliente/consultar-facturas-vencidas"
                    className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3"
                >
                    Consultar mis facturas vencidas
                </Link>
            </div>
        </div>
    );
};

export default ClienteHome;