import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import "../hojaestilo/GerenteHome.css";

const ReportesOperador = () => {
  const [dataOperador, setDataOperador] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await Axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setDataOperador(response.data);
        setTablaUsuarios(response.data);
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
    setDataOperador(resultadosBusqueda);
  };
  return (
    <div className="contenedor-inicialGerente">
      <div class="bg-light">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand">
            <img
              src={logo}
              width="50"
              height="30"
              class="d-inline-block align-top"
              alt="logo"
            />
            SIGEIN
          </a>
          <ul class="navbar-nav ml-auto">
            <Link to="/SignIn" className="btn btn-light btn-lg">
              Cerrar sesión
            </Link>
          </ul>
        </nav>
      </div>
      <div className="reporteOperador">
        <br />
        <div className="barra-busqueda">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por Nombre o celular"
            onChange={handleChange}
          />
        </div>
        <div className="agregar-pago">
          <Link
            to="Gerente/Generar-facturas-mensuales/ReporteCliente"
            className="btn btn-light btn-lg"
          >
            Ver reportes de cliente
          </Link>
        </div>
        <div></div>
        <div className="Tabla-rep-operador">
          <table className="table table-striped table-hover table-responsive-sm">
            <thead class="thead-dark">
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>N° de pagos realizados</th>
              </tr>
            </thead>
            <tbody>
              {dataOperador.map((operador) => (
                <tr key={operador.id}>
                  <td>{operador.id_factura}</td>
                  <td>{operador.payment_institution}</td>
                  <td>{operador.is_deposit}</td>
                  <td>{operador.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportesOperador;
