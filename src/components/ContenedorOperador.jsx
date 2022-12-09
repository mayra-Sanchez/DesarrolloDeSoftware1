import React from "react";
import "../hojaestilo/contenedorOperador.css";
import { Link } from "react-router-dom";

export function ContenedorOperador(props){
    return(
        <div class="mx-auto" className="contenedor-operador">
            <p className="texto1">{props.texto1}</p>
            <img className="operador-logo" src={require(`../Images/${props.imagen}.png`)} alt="Foto {props.nombre}"/>
            <p className="texto2">{props.texto2}</p>
            <Link
                to="/Operador/Consultar-informacion-del-cliente"
                className="btn btn-outline-dark btn-lg  mb-3"
            >
                Consultar informacion del cliente
            </Link>
            <Link to="/Operador/Registar-pagos-realizados" className="btn btn-outline-dark btn-lg  mb-3">
                Registar pagos realizados
            </Link>
        </div>

    );
};