import "../hojaestilo/BuscadorCliente.css";
import Axios from "axios";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const BuscadorCliente = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticion = async () => {
    await Axios.get("https://jsonplaceholder.typicode.com/users")
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
    <div class="contenedor-inicialGerente">
      <div className="Gerente">
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
        <div className="buscador">
          <div className="barra-busqueda">
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por Nombre o celular"
              onChange={handleChange}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-responsive-sm">
              <thead>
                <tr>
                  <th>Celular</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {usuarios &&
                  usuarios.map((usuarios) => (
                    <tr key={usuarios.id}>
                      <td>{usuarios.phone}</td>
                      <td>{usuarios.name}</td>
                      <td>{usuarios.username}</td>
                      <td>{usuarios.email}</td>
                    </tr>
                  ))}
                        
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscadorCliente;
