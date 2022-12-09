import "../hojaestilo/OperadorHome.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { ContenedorOperador } from "../components/ContenedorOperador";

const OperadorHome = () => {
    return (
        <div className="Operador">
            <header className="Operador-header">
                <img src={logo} className="app-logo" alt="logo" />
            </header>
            <ContenedorOperador
                texto1="Bienvenido operador"
                imagen="operador"
                texto2="¿Qué deseas hacer?"
            />
        </div>
    );
};

export default OperadorHome;