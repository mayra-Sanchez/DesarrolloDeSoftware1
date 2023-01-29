import "../hojaestilo/ConsultaCliente.css";
import Axios from "axios";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ConsultaCliente = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticion = async () => {
    await Axios.get("http://127.0.0.1:8000/clients/list-all/")
      .then((response) => {
        setUsuarios(response.data);
        setTablaUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticion();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtro(e.target.value);
  };

  const filtro = (busqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.name.toString().toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  };

  return (
    <div class="contenedor-inicial_Operador">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand">
          <img
            src={logo}
            width="50"
            height="30"
            class="d-inline-block align-top"
            alt="logo"
          />
          SIGEIN
        </div>
        <ul class="navbar-nav ml-auto">
          <Link to="/SignIn" className="btn btn-light btn-lg">
            Cerrar sesión
          </Link>
        </ul>
      </nav>
      <div className="buscaCliente">
        <br />
        <div className="barra-busqueda">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por Nombre o celular"
            onChange={handleChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-responsive-sm">
            <thead class="thead-dark">
              <tr>
                <th>Celular</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {usuarios &&
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.phone}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="boton-home">
          <Link to="/Operador" className="btn btn-success btn-lg">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsultaCliente;