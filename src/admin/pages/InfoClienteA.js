import logo from "../Images/logo-2.png";
import "../hojaestilo/InfoClienteA.css";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

const InfoClienteA = () => {
  const [dataCliente, setDataCliente] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await Axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setDataCliente(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        elemento.cedula
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
    <div class="contenedor-inicial_Administrador">
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
                <th>Pagos</th>
              </tr>
            </thead>
            <tbody>
              {dataCliente.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.celular}</td>
                  <td>
                    <PDFDownloadLink
                      document={cliente.factura}
                      fileName={"Factura"}
                    >
                      <button className="btn btn-outline-dark  mb-1" onClick>
                        {" "}
                        Generar factura{" "}
                      </button>
                    </PDFDownloadLink>
                    <br />
                  </td>
                  <td>
                    <PDFDownloadLink
                      document={cliente.pagos}
                      fileName={"Pagos"}
                    >
                      <button className="btn btn-outline-dark  mb-1" onClick>
                        {" "}
                        Ver pagos{" "}
                      </button>
                    </PDFDownloadLink>
                    <br />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="boton-home">
          <Link to="Admin/Ubicacion" className="btn btn-success btn-lg">
            Ubicación clientes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoClienteA;
