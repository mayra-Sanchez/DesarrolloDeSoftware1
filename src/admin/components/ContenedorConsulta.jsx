import "../hojaestilo/ConsultarInformacion.css";
import { useState } from "react";
import { getAllClients } from "../../services/usersAll";
import { useEffect } from "react";
import Axios from "axios";
import endpoints from "../../services/index";

export function ContenedorConsulta(props) {

    const [usuarios, setUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const peticion = async () => {
        const config = {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
            },
        };
        await Axios.get("http://127.0.0.1:8000/users/list-all/")
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
                elemento.name
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase()) ||
                elemento.name.toString().toLowerCase().includes(busqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setUsuarios(resultadosBusqueda);
    };

    return (
        <div class="mx-auto" className="contenedor-consulta">
            <p className="texto1_Consulta">{props.texto1_Consulta}</p>
            <div className="buscador">
                <div className="barra-busqueda">
                    <input
                        className="form-control inputBuscar"
                        value={busqueda}
                        placeholder="Búsqueda por Nombre o número de celular"
                        onChange={handleChange}
                    />
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover table-responsive-sm">
                        <thead>
                            <tr>
                                <th>Celular</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios &&
                                usuarios.map((usuarios) => (
                                    <tr key={usuarios.id}>
                                        <td>{usuarios.phone_number}</td>
                                        <td>{usuarios.first_name}</td>
                                        <td>{usuarios.last_name}</td>
                                        <td>{usuarios.email}</td>
                                        <td>{usuarios.role}</td>
                                        <td>{usuarios.is_active}</td>
                                        <td>{usuarios.options} <button>Modificar usuarios</button><br></br><button>Cambiar estado</button></td>
                                    </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
