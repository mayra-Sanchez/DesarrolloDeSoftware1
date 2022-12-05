import "../hojaestilo/Home.css";
import { Link } from "react-router-dom";
import logo from "../components/qlog.svg";
import ContentRec from "../components/contentRec";
import React from "react";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div class="d-flex justify-content-center">
        <ContentRec
          title="Bienvenido a la plataforma digital de SIGEIN,
            en la cual dependiendo de tu rol, podrás realizar diversas acciones "
          bgcolor="rgba(229, 230, 194, 1)"
        />
      </div>
      <br />
      <div>
        <Link to="/SignIn" className="btn btn-outline-dark btn-lg">
          Iniciar sesión
        </Link>
        <Link to="/Admin" className="btn btn-outline-dark btn-lg">
          Admin
        </Link>
        <Link to="/Gerente" className="btn btn-outline-dark btn-lg">
          Gerente
        </Link>
        <Link to="/Operador" className="btn btn-outline-dark btn-lg">
          Operador
        </Link>
        <Link to="/Cliente" className="btn btn-outline-dark btn-lg">
          Cliente
        </Link>
      </div>
    </div>
  );
};

export default Home;
