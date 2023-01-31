import logo from "../Images/logo-2.png";
import "../hojaestilo/InfoClienteA.css";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import ReactHTMLTabletoExcel from "react-html-table-to-excel";

const InfoClienteA = () => {
  const [dataCliente, setDataCliente] = useState([]);
  const [tablaClientes, setTablaClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await Axios.get(
      "http://127.0.0.1:8000/energy-products/list-energy-consumptions/"
    )
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
    var resultadosBusqueda = tablaClientes.filter((elemento) => {
      if (
        elemento.client_national_id
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
        <div aling="center">
          <ReactHTMLTabletoExcel
            id="botonExportarExcel"
            className="btn btn-primary"
            table="tablaClientesPagos"
            filename="Clientes_Pagos"
            sheet="pagina 1"
            buttonText="Exportar archivo"
          />
        </div>

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
          <table
            className="table table-striped table-hover table-responsive-sm"
            id="tablaClientesPagos"
          >
            <thead class="thead-dark">
              <tr>
                <th>Cedula</th>
                <th>Precio por kwh</th>
                <th>Total</th>
                <th>Fecha de expedision</th>
                <th>Fecha de vencimiento</th>
                <th>Pagado</th>
              </tr>
            </thead>
            <tbody>
              {dataCliente.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.client_national_id}</td>
                  <td>{cliente.price_kwh}</td>
                  <td>{cliente.amount_kwh}</td>
                  <td>{cliente.issue_date}</td>
                  <td>{cliente.due_date}</td>
                  <th>{cliente.is_fully_paid}</th>
                  <td>
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

export default InfoClienteA;
