import React, { useState } from "react";
import "../hojaestilo/contenedorAutenticar.css";
import "../hojaestilo/RegistrarUsuario.css";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../services/users";
import Swal from "sweetalert2";

export function ContenedorAutenticar(props) {

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    email: "",
    contraseña: "",
    rol: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
    };

    addUser(data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha acctualizado correctamente",
          confirmButtonText: "Continuar",
          allowOutsideClick: false,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/Admin");
          }
        });
      })
      .catch((err) => {
        if (err.response.status === 412) {
          onError(err.response.data);
          console.log(err.response.data);
        } else {
          console.log("error");
          onError("Error al actualizar la información del usuario, intenta de nuevo.");
        }

        console.log(err);
      });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Opps algo salió mal",
      text: "Error al actualizar la información del usuario, intenta de nuevo.",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
  };

  return (
    <div class="mx-auto" className="contenedor-autenticar">
      <p className="texto1_Autenticar">{props.texto1_Autenticar}</p>
      <div class="contenedor-secundario">
      <div className="Registro">
          <form onSubmit={handleSubmit}>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label>Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  class="form-control"
                  placeholder="Juanito"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="form-group col-md-4">
                <label>Apellido</label>
                <input
                  name="apellido"
                  type="text"
                  class="form-control"
                  placeholder="Cardenas"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="form-group col-md-4">
                <label>Celular</label>
                <input
                  type="text"
                  name="celular"
                  class="form-control"
                  placeholder="Celular"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="juanito@gmail.com
                  "
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="contraseña"
                  class="form-control"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label>Rol</label>
              <select
                name="rol"
                class="form-control"
                onChange={handleChange}
                required
              >
                <option>Administrador</option>
                <option>Operador</option>
                <option>Gerente</option>
                <option>Cliente</option>
              </select>
            </div>
              <button type="submit" class="btn btn-primary">
                Actualizar
              </button>
              <nbsp>          </nbsp>
              <button type="reset" class="btn btn-primary">
                Cancelar
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}