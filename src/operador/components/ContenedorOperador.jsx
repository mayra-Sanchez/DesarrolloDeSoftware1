import React from "react";
import "../hojaestilo/contenedorOperador.css";
import { Link } from "react-router-dom";

export function ContenedorOperador(props){
    return(
        <div class="mx-auto" className="contenedor-operador">
            <p className="texto1_Operador">{props.texto1_Operador}</p>
            <img className="operador-logo" src={require(`../Images/${props.imagen}.png`)} alt="Foto {props.nombre}"/>
            <p className="texto2_Operador">{props.texto2_Operador}</p>
            <Link
                to="/Operador/Consultar-Cliente"
                className="btn btn-outline-dark btn-lg  mb-3"
            >
                Consultar informacion del cliente
            </Link>
            <Link to="/Operador/Registar-pagos-realizados" className="btn btn-outline-dark btn-lg  mb-3">
                Registar pagos bancos
            </Link>
            <Link to="/Operador/Registrar-pagos-clientes" className="btn btn-outline-dark btn-lg  mb-3">
                Registar pagos clientes
            </Link>
        </div>
    );
};