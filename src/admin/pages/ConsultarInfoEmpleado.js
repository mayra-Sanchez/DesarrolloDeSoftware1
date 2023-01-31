import logo from "../Images/logo-2.png";
import "../hojaestilo/ConsultarInformacion.css";
import React from "react";
import { Link } from "react-router-dom";
import { ConsultarConsultaEmpleado } from "../components/ContenedorConEmpleado";


const ConsultarInformacionEmpleado = () => {

    return (
        <div class="bg-light">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
                    <Link to="/SignIn" className="btn btn-light btn-lg">
                        Cerrar sesión
                    </Link>
                </ul>
            </nav>
            <ConsultarConsultaEmpleado
            texto1_Consulta= "Consulta de empleados"
            />
        </div>
    );
}

export default ConsultarInformacionEmpleado;