import "../hojaestilo/ConsultarInformacion.css";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export function ContenedorConsulta(props) {

    const [usuarios, setUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    

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

    const handleStatus = (id) => {
        actualizarEstado(id)   
      };

    const actualizarEstado = (usuario)=> {
        setUsuarios([ ...usuarios, {...usuario, is_active: !usuario.is_active}  ]);
    }

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
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.phone_number}</td>
                                        <td>{usuario.first_name}</td>
                                        <td>{usuario.last_name}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.role}</td>
                                        <td>{usuario.is_active ? ("Activo") : ("Inactivo")}</td>
                                        <td>{usuario.options} 
                                        <Link to="/Admin/Autenticar-usuario" className="btn btn-outline-dark mb-1"> Modificar usuarios</Link> 
                                        <br/>
                                        <button className="btn btn-outline-dark  mb-1" onClick={() => setUsuarios([ ...usuarios, {...usuario, is_active: !usuario.is_active}])}
                                        >Cambiar estado</button></td>
                                    </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
