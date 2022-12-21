import "../hojaestilo/AutenticarUsuario.css";
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";

const RegistrarUsuario = () => {
  return (
    <div className="RegistrarUsuario">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">
          <img
            src={logo}
            width="50"
            height="30"
            class="d-inline-block align-top"
            alt="logo"
          />
          SIGEIN
        </a>
        <ul class="navbar-nav ml-auto">
          <Link to="/SignIn" className="btn btn-light btn-lg">
            Cerrar sesión
          </Link>
        </ul>
      </nav>
      <header id="header">
        <div class="container mt-5">
          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputNombre4">Nombre</label>
                <input
                  type="Nombre"
                  class="form-control"
                  id="inputNombre4"
                  placeholder="Juanito"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputApellido4">Apellido</label>
                <input
                  type="Apellido"
                  class="form-control"
                  id="inputApellido4"
                  placeholder="Cardenas"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputCelular4">Celular</label>
                <input
                  type="Celular"
                  class="form-control"
                  id="inputCelular4"
                  placeholder="Celular"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="juanito@gmail.com
                  "
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputCity">Contraseña</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputState">Rol</label>
              <select id="inputState" class="form-control">
                <option>Administrador</option>
                <option>Operador</option>
                <option>Gerente</option>
                <option>Cliente</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              Registrar
            </button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default RegistrarUsuario;
