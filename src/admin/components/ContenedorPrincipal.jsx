import React from "react";
import "../hojaestilo/contenedorPrincipal.css";
import { Link } from "react-router-dom";

export function ContenedorPrincipal(props) {
  return (
    <div class="mx-auto" className="contenedor-admin">
      <p className="texto1_Admin">{props.texto1_Admin}</p>
      <img
        className="admin-logo"
        src={require(`../Images/${props.imagen}.png`)}
        alt="Foto {props.nombre}"
      />
      <p className="texto2_Admin">{props.texto2_Admin}</p>
      <Link
        to="/Admin/Registrar-usuarios"
        className="btn btn-outline-dark btn-lg  mb-3"
      >
        Registrar usuarios
      </Link>
      <Link to="/Admin/Registrar_Cliente" className="btn btn-primary">
                Registrar cliente
              
    </Link>
      <Link
        to="/Admin/Consultar-informacion"
        className="btn btn-outline-dark btn-lg mb-3 "
      >
        Consultar informacion 
      </Link>
      <Link
        to="/Admin/Gestionar-Clientes"
        className="btn btn-outline-dark btn-lg mb-3 "
      >
        Gestionar clientes
      </Link>
    </div>
  );
}
