import React from "react";
import "../hojaestilo/contenedorPago.css";
import "../hojaestilo/OperadorHome.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import { useEffect } from "react";
import { actualizarEstado } from "../../services/users";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Axios from "axios";

export function ContenedorPagos(props) {

    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [modalPagar, setModalPagar] = useState(false);

    //Usuario
    const [datosSeleccionado, setDatosSeleccionado] = useState({
        id: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    //Factura
    const [datosPagarFactura, setDatosPagarFactura] = useState({
        id: '',
        total_amount_to_pay: '',

    });

    const peticion = async () => {
        await Axios.get("http://127.0.0.1:8000/users/list-all/") //"http://127.0.0.1:8000/users/list-all/" nuestra BD
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
                elemento.phone_number
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase()) ||
                elemento.phone_number.toString().toLowerCase().includes(busqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setUsuarios(resultadosBusqueda);
    };

    const handleStatus = (id) => {
        actualizarEstado(id);
    };

    const actualizarEstadoMetodo = (FacturaUsuario) => {
        var actualizacion;
        if (FacturaUsuario.facturaStatus === true) {
            actualizacion = false;
        } else if (FacturaUsuario.facturaStatus === false) {
            actualizacion = true;
        }

        const body = { facturaStatus: actualizacion };

        actualizarEstado(body, FacturaUsuario.id).then((response) => {
            setUsuarios([response]);
            setTablaUsuarios([response]);
        });
    };

    const subirInfo = (e) => {
        const { name, value } = e.target;
        setDatosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }))
        setDatosPagarFactura((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const seleccionarDatos = (FacturaUsuario, caso) => {
        setDatosSeleccionado(FacturaUsuario);
        (caso === 'Pagar') && setModalPagar(true)
    }

    const pagar = () => {

    }

    return (
        <div class="mx-auto" className="contenedor-inicialOperador">
            <br />
            <p className="texto1_Pago">{props.texto1_Pago}</p>
            <div className="buscadorPago">
                <div className="barra-busquedaPago">
                    <input
                        className="form-control inputBuscar"
                        /*value={busqueda}*/
                        placeholder="Número de celular del cliente"
                    /*onChange={handleChange}*/
                    />
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-responsive-sm">
                    <thead>
                        <tr>
                            <th>Factura ID</th>
                            <th>Dirección</th>
                            <th>Consumo</th>
                            <th>Valor</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios &&
                            usuarios.map((FacturaUsuario) => (
                                <tr key={FacturaUsuario.id_energy_consumption}>
                                    <td>{FacturaUsuario.address}</td>
                                    <td>{FacturaUsuario.amount_kwh}</td>
                                    <td>{FacturaUsuario.total_amount_to_pay}</td>
                                    <td>{FacturaUsuario.due_date}</td>
                                    <td>{FacturaUsuario.is_fully_paid ? "Pago" : "Sin pagar"}</td>
                                    <td>
                                        {FacturaUsuario.options}
                                        <button className="btn btn-outline-dark  mb-1" onClick={() => seleccionarDatos(FacturaUsuario, 'Pagar')}> Pagar </button>

                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Modal isOpen={modalPagar}>
                    <ModalHeader>
                        <div>
                            <h3> Pagar factura </h3>
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
                                value={datosSeleccionado && datosSeleccionado.id}
                            />
                            <br />

                            <label>Nombre</label>
                            <input
                                className="form-control"
                                type="text"
                                name="first_name"
                                value={datosSeleccionado && datosSeleccionado.first_name}
                                onChange={subirInfo}
                            />
                            <br />

                            <label>Apellido</label>
                            <input
                                className="form-control"
                                type="text"
                                name="last_name"
                                value={datosSeleccionado && datosSeleccionado.last_name}
                                onChange={subirInfo}
                            />
                            <br />

                            <label>Celular</label>
                            <input
                                className="form-control"
                                type="text"
                                name="phone_number"
                                value={datosSeleccionado && datosSeleccionado.phone_number}
                                onChange={subirInfo}
                            />
                            <br />

                            <label>Email</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                value={datosSeleccionado && datosSeleccionado.email}
                                onChange={subirInfo}
                            />
                            <br />

                            <label>Factura ID</label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="id_energy_consumption"
                                value={datosPagarFactura && datosPagarFactura.id_energy_consumption}
                            />
                            <br />

                            <label>Valor a pagar: </label>
                            <input
                                className="form-control"
                                type="text"
                                name="amount"
                                value={datosPagarFactura && datosPagarFactura.amount}
                                onChange={subirInfo}
                            />
                            <br />

                            <label>Punto de pago</label>
                            <select
                                name="payment_institution"
                                class="form-control"
                                onChange={subirInfo}
                                required
                                value={datosPagarFactura && datosPagarFactura.payment_institution}
                            >
                                <option value="punto_baloto">Baloto</option>
                                <option value="punto_gane">GANE</option>
                                <option value="punto_efecty">Efecty</option>
                                <option value="punto_bancolombia">Bancolombia</option>
                            </select>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => pagar()}>
                            Pagar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => setModalPagar(false)}
                        >
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>

    );
};