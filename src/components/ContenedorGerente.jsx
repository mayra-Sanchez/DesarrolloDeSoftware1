import React from "react";
import "../hojaestilo/contenedorGerente.css";
import { Link } from "react-router-dom";

export function ContenedorGerente(props){
    return(
        <div class="mx-auto" className="contenedor-gerente">
            <p className="texto1">{props.texto1}</p>
            <img className="gerente-logo" src={require(`../Images/${props.imagen}.png`)} alt="Foto {props.nombre}"/>
            <p className="texto2">{props.texto2}</p>
            <Link
                to="/Gerente/Buscador-de-clientes"
                className="btn btn-outline-dark btn-lg  mb-3"
            >
                Buscador de clientes
            </Link>

            <Link to="/Gerente/Consultar-reportes" className="btn btn-outline-dark btn-lg  mb-3">
                Consultar reportes
            </Link>

            <Link to="/Gerente/Consultar-consumo-de-clientes" className="btn btn-outline-dark btn-lg  mb-3">
                Consultar consumo de clientes
            </Link>

            <Link to="/Gerente/Archivos-de-clientes" className="btn btn-outline-dark btn-lg  mb-3">
                 Archivos de clientes
            </Link>

            <Link to="/Gerente/Generar-facturas-mensuales" className="btn btn-outline-dark btn-lg  mb-3">
                Generar facturas mensuales
            </Link>
        </div>

    );
};