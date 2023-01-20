import React from "react";
import "../hojaestilo/contenedorCliente.css";
import { Link } from "react-router-dom";

export function ContenedorCliente(props){
    return(
        <div class="mx-auto" className="contenedor-cliente">
            <p className="texto1_Cliente">{props.texto1_Cliente}</p>
            <img className="cliente-logo" src={require(`../Images/${props.imagen}.png`)} alt="Foto {props.nombre}"/>
            <p className="texto2_Cliente">{props.texto2_Cliente}</p>
            <Link
                to="/Cliente/consumo-mensual"
                className="btn btn-outline-dark btn-lg  mb-3"
            >
                 Ver mi consumo mensual
            </Link>
            <Link
                to="/Cliente/pagar-facturas-online"
                className="btn btn-outline-dark btn-lg  mb-3"
            >
                Pagar mis facturas online 
            </Link>
            <Link
                to="/Cliente/consultar-facturas-vencidas"
                className="btn btn-outline-dark btn-lg  mb-3"
            >
                 Consultar mis facturas vencidas
            </Link>
        </div>
    );
};