import logo from "../Images/logo-2.png";
import "../hojaestilo/ConsultaCliente.css";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { listAllClients } from "../../services/clients";

const ConsultaCliente = () => {
  const [dataCliente, setDataCliente] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        "http://127.0.0.1:8000/energy-products/csv-energy-consumptions/",
        {
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const peticion = async () => {
    listAllClients()
      .then((response) => {
        setDataCliente(response);
        setTablaUsuarios(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateBill = async (id) => {
    const url = "http://localhost:8000/bills/user_bill/" + id;
    window.open(url, "_blank");
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
        elemento.national_id
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
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Facturas</th>
              </tr>
            </thead>
            <tbody>
              {dataCliente.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.national_id}</td>
                  <td>{cliente.first_name}</td>
                  <td>{cliente.last_name}</td>
                  <td>{cliente.email}</td>
                  <td>
                    <button
                      className="btn btn-outline-dark  mb-1"
                      onClick={() => generateBill(cliente.id)}
                    >
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
        <div class="form-row">
          <div class="col-md-6">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="btn btn-success"
            >
              {loading ? "Downloading..." : "Descargar archivo csv con pagos"}
            </button>
          </div>
        </div>
        {/* <div className="boton-home">
          <Link to="Admin/Ubicacion" className="btn btn-success btn-lg">
            Ubicación clientes
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ConsultaCliente;