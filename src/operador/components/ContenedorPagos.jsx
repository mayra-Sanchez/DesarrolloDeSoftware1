import React from "react";
import "../hojaestilo/contenedorPago.css";
import "../hojaestilo/OperadorHome.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useState, useEffect } from "react";
import { list_energy_consumptions } from "../../services/energy";

const data = [
    { facturaID: 1234, direccion: "La fortaleza", number: 3213615366, consumo: "126 Kwh", valor: 210.000, fecha: "3/02/2023", estado: "Sin pagar" },
];

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
                            <th>Número de celular</th>
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
                                        <button className="btn btn-outline-dark  mb-1" onClick={() => seleccionarDatos(usuario, 'Pagar')}> Pagar factura </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}