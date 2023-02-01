import React from "react";
import "../hojaestilo/contenedorPago.css";
import "../hojaestilo/OperadorHome.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useState, useEffect } from "react";
import { list_energy_consumptions } from "../../services/energy";

export function ContenedorPagos(props) {
    const [usuarios, setUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalPagar, setModalPagar] = useState(false);

    const [datosSeleccionado, setDatosSeleccionado] = useState({
        id: '',
        contract_address: '',
        client_national_id: '',
        amount_kwh: '',
        total_amount_to_pay: '',
        due_date: '',
    });

    const [datosFactura, setDatosFactura] = useState({
        id: '',
        type: 'in-house',
        payment_institution: '',
        amount: '',
    });

    const peticion = async () => {
        list_energy_consumptions()
            .then((response) => {
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

    const filtro = (busqueda) => {
        var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
            if (
                elemento.client_national_id
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setUsuarios(resultadosBusqueda);
    };

    const handleChange = (e) => {
        setBusqueda(e.target.value);
        filtro(e.target.value);
    };

    const seleccionarDatos = (usuario, caso) => {
        setDatosSeleccionado(usuario);
        (caso === 'Pagar') && setModalPagar(true)
    }

    const subirInfo = (e) => {
        const { name, value } = e.target;
        setDatosFactura((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const pagar =()=>{

    }
    /* const pagar = () => {
         
         const handleClick = async () => {
             try {
                 const res = await Axios.put(`http://127.0.0.1:8000/users/${usuario.id}/update-info/`, {
                     email: usuario.email,
                     first_name: usuario.first_name,
                     last_name: usuario.last_name,
                     phone_number: usuario.phone_number,
                     role: usuario.role,
                 });
 
                 console.log(res.data);
             } catch (error) {
                 console.error(error);
             }
         }
 
         handleClick()
         setModalPagar(false);
     }
 */

    return (
        <div class="mx-auto" className="contenedor-inicialOperador">
            <br />
            <p className="texto1_Pago">{props.texto1_Pago}</p>
            <div className="buscadorPago">
                <div className="barra-busquedaPago">
                    <input
                        className="form-control inputBuscar"
                        value={busqueda}
                        placeholder="Número de identificación"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th>Factura ID</th>
                            <th>Dirección</th>
                            <th>Número de cédula</th>
                            <th>Consumo de energia</th>
                            <th>Valor a pagar</th>
                            <th>Fecha de vencimiento</th>
                            <th>Estado actual</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios &&
                            usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.contract_address}</td>
                                    <td>{usuario.client_national_id}</td>
                                    <td>{usuario.amount_kwh}</td>
                                    <td>{usuario.total_amount_to_pay}</td>
                                    <td>{usuario.due_date}</td>
                                    <td>{usuario.is_fully_paid ? "Pago" : "Sin pagar"}</td>
                                    <td>
                                        {usuario.options}
                                        <button disabled={usuario.is_fully_paid} className="btn btn-outline-light  mb-1" onClick={() => seleccionarDatos(usuario, 'Pagar')}> Pagar factura </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Modal isOpen={modalPagar}>
                    <ModalHeader>
                        <div>
                            <h3> Pago de factura </h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>Factura ID: </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="id"
                                value={datosSeleccionado && datosSeleccionado.id}
                            />
                            <br />

                            <label>Dirección: </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="contract_address"
                                value={datosSeleccionado && datosSeleccionado.contract_address}
                            />
                            <br />

                            <label>Número de identificación: </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="client_national_id"
                                value={datosSeleccionado && datosSeleccionado.client_national_id}
                            />
                            <br />

                            <label>Consumo total: </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="amount_kwh"
                                value={datosSeleccionado && datosSeleccionado.amount_kwh}
                            />
                            <br />

                            <label>Precio de consumo: </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="total_amount_to_pay"
                                value={datosSeleccionado && datosSeleccionado.total_amount_to_pay}
                            />
                            <br />

                            <label>Valor a pagar: </label>
                            <input
                                className="form-control"
                                type="text"
                                name="amount"
                                value={datosFactura && datosFactura.amount}
                                onChange={subirInfo}
                            />
                            <br />
                            <label>Punto de pago</label>
                            <select
                                name="payment_institution"
                                class="form-control"
                                onChange={subirInfo}
                                required
                                value={datosFactura && datosFactura.payment_institution}
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
    )
}