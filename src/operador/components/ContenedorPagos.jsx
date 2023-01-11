import React from "react";
import "../hojaestilo/contenedorPago.css";
import "../hojaestilo/OperadorHome.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Axios from "axios";

export function ContenedorPagos(props) {
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
                </table>
            </div>
        </div>

    );
};