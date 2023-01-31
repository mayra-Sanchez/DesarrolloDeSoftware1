import React, { useState } from "react";
import "../hojaestilo/RegistrarUsuario.css";
import logo from "../Images/logo-2.png";
import { Link, useNavigate } from "react-router-dom";
import { addClients } from "../../services/users";
import Swal from "sweetalert2";

const RegistrarCliente = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    national_id: "",
    person_type: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
    };

    Swal.fire({
      title: "Atención, estás seguro de realizar esta acción",
      text: "Vas a registrarte como un nuevo usuario",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: `Confirmar`,
      allowOutsideClick: false,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          addClients(data)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "Te has registrado correctamente",
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
                onError("Error al crear el cargo, intenta de nuevo.");
              }

              console.log(err);
            });
        });
      },
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Opps algo salió mal",
      text: "Ocurrió un error al crear el usuario, intenta de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
  };

  return (
    <div className="RegistrarUsuario">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand">
          <img
            src={logo}
            width="50"
            height="30"
            class="d-inline-block align-top"
            alt="logo"
          />
          SIGEIN
        </div>
        <ul class="navbar-nav ml-auto">
          <Link to="/SignIn" className="btn btn-light btn-lg">
            Cerrar sesión
          </Link>
        </ul>
      </nav>
      <div className="Registro">
        <div class="container mt-5">
          <form onSubmit={handleSubmit}>
            <div class="form-row">
              <div class="form-group col-md-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="juanito@gmail.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div class="form-group col-md-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  required
                />
              </div>

              <div class="form-group col-md-3">
                <label>Nombre</label>
                <input
                  name="first_name"
                  type="text"
                  class="form-control"
                  placeholder="Juanito"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="form-group col-md-3">
                <label>Apellido</label>
                <input
                  name="last_name"
                  type="text"
                  class="form-control"
                  placeholder="Cardenas"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Celular</label>
                <input
                  type="number"
                  name="phone_number"
                  class="form-control"
                  placeholder="Celular"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label>Cédula</label>
                <input
                  name="national_id"
                  type="text"
                  class="form-control"
                  placeholder="Cédula"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="form-group ">
              <label>Tipo de persona</label>
              <select
                name="person_type"
                class="form-control"
                onChange={handleChange}
                required
              >
                <option value="natural">Natural</option>
                <option value="juridica">Juridica</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarCliente;
