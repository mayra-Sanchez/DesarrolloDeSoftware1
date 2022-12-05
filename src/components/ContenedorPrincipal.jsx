import React from "react";
import "../hojaestilo/contenedorPrincipal.css";
import { Link } from "react-router-dom";

export function ContenedorPrincipal(props) {
  return (
    <div class= "mx-auto" className="contenedor-admin">
        <p className="texto1">{props.texto1}</p>
      <img
        className="admin-logo"
        src={require(`../Images/${props.imagen}.png`)}
        alt="Foto {props.nombre}"
      />
        <p className="texto2">{props.texto2}</p>
        <Link
          to="/Admin/Gestion-usuarios"
          className="btn btn-outline-dark btn-lg  mb-3"
        >
          Gestionar usuarios
        </Link>

        <Link
          to="/Admin/Configuracion-sistema"
          className="btn btn-outline-dark btn-lg  mb-3"
        >
          Configurar el sistema
        </Link>
    </div>
  );
}
