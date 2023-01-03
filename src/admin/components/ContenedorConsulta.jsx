import "../hojaestilo/ConsultarInformacion.css";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { actualizarEstado } from "../../services/users";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

export function ContenedorConsulta(props) {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalEditar, setModalEditar] = useState(false);
  const [datosSeleccionado, setDatosSeleccionado] = useState({
    id: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
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
    const { name, value } = e.target;
    setDatosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
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
    actualizarEstado(id);
  };

  const actualizarEstadoMetodo = (usuario) => {
    var actualizacion;
    if (usuario.is_active === true) {
      actualizacion = false;
    } else if (usuario.is_active === false) {
      actualizacion = true;
    }

    const body = { is_active: actualizacion };

    actualizarEstado(body, usuario.id).then((response) => {
      setUsuarios([response]);
      setTablaUsuarios([response]);
    });
  };

  const seleccionarDatos = (usuario, caso) => {
    setDatosSeleccionado(usuario);
    (caso === 'Editar') && setModalEditar(true)
  }

  const editar = () => {
    var dataNueva = usuarios;
    dataNueva.map(usuarios => {
      if (usuarios.id === datosSeleccionado.id) {
        usuarios.phone_number = datosSeleccionado.phone_number;
        usuarios.first_name = datosSeleccionado.first_name;
        usuarios.last_name = datosSeleccionado.last_name;
        usuarios.email = datosSeleccionado.email;
        usuarios.role = datosSeleccionado.role;
      }
    });
    setUsuarios(dataNueva);
    setModalEditar(false);
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
                    <td>{usuario.is_active ? "Activo" : "Inactivo"}</td>
                    <td>
                      {usuario.options}
                      <button className="btn btn-outline-dark  mb-1" onClick={() => seleccionarDatos(usuario, 'Editar')}> Modificar usuario </button>
                      <br />
                      <button className="btn btn-outline-dark  mb-1" onClick={() => actualizarEstadoMetodo(usuario)}> Cambiar estado </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3> Modificar datos </h3>
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
                  onChange={handleChange}
                />
                <br />

                <label>Apellido</label>
                <input
                  className="form-control"
                  type="text"
                  name="last_name"
                  value={datosSeleccionado && datosSeleccionado.last_name}
                  onChange={handleChange}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone_number"
                  value={datosSeleccionado && datosSeleccionado.phone_number}
                  onChange={handleChange}
                />
                <br />

                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={datosSeleccionado && datosSeleccionado.email}
                  onChange={handleChange}
                />
                <br />

                <label>Rol</label>
                <select
                  name="role"
                  class="form-control"
                  onChange={handleChange}
                  required
                  value={datosSeleccionado && datosSeleccionado.role}
                >
                  <option value="admin">Administrador</option>
                  <option value="operator">Operador</option>
                  <option value="manager">Gerente</option>
                  <option value="client">Cliente</option>
                </select>
                <br />

              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() => editar()}>
                Actualizar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setModalEditar(false)}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}
