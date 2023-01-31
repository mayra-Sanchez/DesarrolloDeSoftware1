import "../hojaestilo/UbicacionCliente.css";
import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from "react";
import { useRef } from "react";
import L from "leaflet";

const markerIcon = new L.Icon({
    iconUrl: require("../Images/location.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46]
})

export function ContenedorUbicacion(props) {
    const [center, setCenter] = useState({ lat: 3.42158, lng: -76.5205 });
    const ZOOM_LEVEL = 15;
    const mapRef = useRef();
    return (
        <div class="mx-auto" className="contenedor-ubicacion">
            <p className="texto1_Ubicacion">{props.texto1_Ubicacion}</p>
                <MapContainer center={center} zoom={ZOOM_LEVEL}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[3.43722, -76.5225]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Mayra </b><br /><b>Apellido: Sanchez </b><br /><b>Celular: 3013615366 </b></Popup>
                    </Marker>
                    <Marker position={[3.45010, -76.5025]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Mariano </b><br /><b>Apellido: Casanova </b><br /><b>Celular: 3026929375 </b>
                        </Popup>
                    </Marker>
                    <Marker position={[3.45520, -76.5125]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Lola </b><br /><b>Apellido: Indigo </b><br /><b>Celular: 9564854662 </b>
                        </Popup>
                    </Marker>
                    <Marker position={[3.42054, -76.5485]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Laura </b><br /><b>Apellido: Jaimes </b><br /><b>Celular: 3056847890 </b>
                        </Popup>
                    </Marker>
                    <Marker position={[3.46454, -76.5225]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Juan </b><br /><b>Apellido: Bailon </b><br /><b>Celular: 3213615366 </b>
                        </Popup>
                    </Marker>
                    <Marker position={[3.47454, -76.49155]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Alejandra </b><br /><b>Apellido: Saenz </b><br /><b>Celular: 3124568656</b>
                        </Popup>
                    </Marker>
                    <Marker position={[3.48454, -76.5255]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Critiano </b><br /><b>Apellido: Ronaldo </b><br /><b>Celular: 3025684564 </b>
                        </Popup>
                    </Marker>
                    <Marker position={[3.39454, -76.5255]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Diego </b><br /><b>Apellido: Sanchez </b><br /><b>Celular: 3174884906 </b>
                        </Popup>
                    </Marker>
                    <Marker position={[3.40954, -76.5355]} icon={markerIcon} >
                        <Popup>
                            <b>Nombre: Maribel </b><br /><b>Apellido: Orozco </b><br /><b>Celular: 3026859541 </b>
                        </Popup>
                    </Marker>
                </MapContainer>
        </div >
    );
}
