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
                <label for="inputId4">Id</label>
                <input
                  type="id"
                  class="form-control"
                  id="inputId4"
                  placeholder="Id"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputCelulard4">Celular</label>
                <input
                  type="celular"
                  class="form-control"
                  id="inputCelular4"
                  placeholder="Celular"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Contraseña</label>
                <input
                  type="Contraseña"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  placeholder="Juanito Cardenas"
                />
              </div>
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
            </div>
            <div class="form-group">
              <label for="inputState">Tipo de persona</label>
              <select id="inputState" class="form-control">
                <option>Natural</option>
                <option>Jurídica</option>
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
