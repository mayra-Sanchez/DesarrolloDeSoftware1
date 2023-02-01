import "../hojaestilo/ConsumoCliente.css";
import Axios from "axios";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { list_energy_consumptions } from "../../services/energy";

const ConsumoCliente = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticion = async () => {
    list_energy_consumptions()
      .then((response) => {
        console.log(response)
        setUsuarios(response);
        setTablaUsuarios(response);
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
        elemento.client_national_id
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.client_national_id.toString().toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  };

    return (
    <div class="contenedor-inicialGerente">
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

      <div className="consultac">
        <br />
        <div className="barra-busqueda">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por identificación"
            onChange={handleChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-responsive-sm">
            <thead class="thead-dark">
              <tr>
                <th>Identificación</th>
                <th>Mes</th>
                <th>Kw/h consumidos</th>
                <th>Precio Kw/h</th>
                <th>Total a pagar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios &&
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.client_national_id}</td>
                    <td>{usuario.issue_date}</td>
                    <td>{usuario.amount_kwh}</td>
                    <td>{usuario.price_kwh}</td>
                    <td>{usuario.total_amount_to_pay}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      
        <div className="boton-home">
          <Link to="/Gerente" className="btn btn-success btn-lg">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsumoCliente;
