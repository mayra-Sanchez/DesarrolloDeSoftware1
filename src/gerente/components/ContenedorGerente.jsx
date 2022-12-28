import React from "react";
import "../hojaestilo/contenedorGerente.css";
import { Link } from "react-router-dom";

export function ContenedorGerente(props){
    return(
        <div class="mx-auto" className="contenedor-gerente">
            <p className="texto1_Gerente">{props.texto1_Gerente}</p>
            <img className="gerente-logo" src={require(`../Images/${props.imagen}.png`)} alt="Foto {props.nombre}"/>
            <p className="texto2_Gerente">{props.texto2_Gerente}</p>
            <Link to="/Gerente/Gestionar-clientes" className="btn btn-outline-dark btn-lg  mb-3">
                Gestionar clientes
            </Link>
            <Link to="/Gerente/Generar-facturas-mensuales" className="btn btn-outline-dark btn-lg  mb-3">
                Generar facturas mensuales
            </Link>
        </div>
    );
};