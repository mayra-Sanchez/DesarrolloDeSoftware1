import "../hojaestilo/PagosRealizados.css";
import Axios from "axios";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const PagosRealizados = () => {
  const [pagos, setPagos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [pagoSelecionado, setPagoSelecionado] = useState({
    id_payment: "",
    id_factura: "",
    payment_institution: "",
    is_deposit: "", //monto
    date: "",
  });

  const peticionGet = async () => {
    await Axios.get("http://127.0.0.1:8000/users/list-all/") //pedir la URL de la data
      .then((response) => {
        setPagos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const abrirModalInsertar = () => {
    setPagoSelecionado(null);
    setModalInsertar(true);
  };

  const insertar = () => {
    var valorInsertar = pagoSelecionado;
    valorInsertar.id_payment = pagos[pagos.length - 1].id_payment + 1;
    var dataNueva = pagos;
    dataNueva.push(valorInsertar); //verificar eso del push
    setPagos(dataNueva);
    setModalInsertar(false);
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
        <div className="pago">
          <br />
          <br />
          <br />
          <button
            className="btn btn-success"
            onClick={() => abrirModalInsertar()}
          >
            Agregar pago
          </button>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-responsive-sm">
              <thead>
                <tr>
                  <th>N° factura</th>
                  <th>Nombre del banco</th>
                  <th>Celular del operador</th>
                  <th>Monto del pago</th>
                </tr>
              </thead>
              <tbody>
                {pagos &&
                  pagos.map((pago) => (
                    <tr key={pago.id}>
                      <td>{pago.id_factura}</td>
                      <td>{pago.payment_institution}</td>
                      <td>{pago.is_deposit}</td>
                      <td>{pago.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Modal isOpen={modalInsertar}>
              <ModalHeader>
                <div>
                  <h3>Insertar País</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label>ID</label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    name="id"
                    value={pagos[pagos.length - 1].id_payment + 1} //id que tenemos en la ultima posicion +1
                  />
                  <br />

                  <label>N° factura</label>
                  <input
                    className="form-control"
                    type="text"
                    name="factura"
                    value={pagoSelecionado ? pagoSelecionado.id_factura : ""}
                    onChange
                  />
                  <br />

                  <label>Nombre del banco</label>
                  <input
                    className="form-control"
                    type="text"
                    name="banco"
                    value={
                      pagoSelecionado ? pagoSelecionado.payment_institution : ""
                    }
                    onChange
                  />
                  <br />

                  <label>Monto</label>
                  <input
                    className="form-control"
                    type="number"
                    name="monto"
                    value={pagoSelecionado ? pagoSelecionado.is_deposit : ""}
                    onChange
                  />
                  <br />

                  <label>Fecha</label>
                  <input
                    className="form-control"
                    type="number"
                    name="fecha"
                    value={pagoSelecionado ? pagoSelecionado.date : ""}
                    onChange
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-primary" onClick={() => insertar()}>
                  Insertar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setModalInsertar(false)}
                >
                  Cancelar
                </button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagosRealizados;
