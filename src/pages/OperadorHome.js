import "../hojaestilo/OperadorHome.css";
import logo from "../Images/logo-2.png";
import OperadorLogo from "../Images/operador.png";
import { Link } from "react-router-dom";
import React from "react";

const OperadorHome = () => {
    return (
        <div className="Operaodr">
            <header className="Operador-header">
                <img src={logo} className="app-logo" alt="logo" />
            </header>
            <div className="contenedor-operador">
                <h1 className="text-sm-center">Bienvenido operador</h1>
                <img src={OperadorLogo} className="operador-logo" alt="operadorLogo" />
                <h2>¿Qué deseas hacer?</h2>
                <Link
                    to="/Operador/Consultar-informacion-del-cliente"
                    className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3"
                >
                    Consultar informacion del cliente
                </Link>

                <Link to="/Operador/Registar-pagos-realizados" className="btn btn-outline-dark btn-lg btn-primary btn-block mb-3">
                Registar pagos realizados
                </Link>
            </div>
        </div>
    );
};

export default OperadorHome;