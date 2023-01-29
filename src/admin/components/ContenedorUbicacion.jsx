import "../hojaestilo/UbicacionCliente.css";
import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export function ContenedorUbicacion(props) {
    return (
        <div class="mx-auto" className="contenedor-ubicacion">
            <p className="texto1_Ubicacion">{props.texto1_Ubicacion}</p>
            <div className="buscadorUbicacion">
                <div className="barra-busquedaUbicacion">
                    <input
                        className="form-control inputBuscar"
                        /*value={busqueda}*/
                        placeholder="Búsqueda por número de celular"
                        /*onChange={handleChange}*/
                    />
                </div>
            </div>
            <MapContainer center={[3.42158, -76.5205]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div >

    );
}
