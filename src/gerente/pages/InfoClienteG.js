import logo from "../Images/logo-2.png";
import "../hojaestilo/InfoClienteG.css";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { listAllClients, clientBill } from "../../services/clients";

const InfoClienteG = () => {
  const [dataCliente, setDataCliente] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    listAllClients()
      .then((response) => {
        setDataCliente(response);
        setTablaUsuarios(response)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateBill = async (id) => {
    const url = "http://localhost:8000/bills/user_bill/" + id
    window.open(url, "_blank")
  }


  useEffect(() => {
    peticionGet();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtro(e.target.value);
  };

  const filtro = (busqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.national_id
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.first_name
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setDataCliente(resultadosBusqueda);
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
      <div className="pago">
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
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Celular</th>
                <th>Facturas</th>
              </tr>
            </thead>
            <tbody>
              {dataCliente.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.national_id}</td>
                  <td>{cliente.first_name}</td>
                  <td>{cliente.last_name}</td>
                  <td>{cliente.phone_number}</td>
                  <td>
                    <button className="btn btn-outline-dark  mb-1" onClick={() => generateBill(cliente.id)}>
                      {" "}
                      Generar factura{" "}
                    </button>
                    <br />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfoClienteG;
