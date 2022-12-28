import "../hojasestilo/Home.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo-inicial.png";
import ContentRec from "../components/contentRec";
import React from "react";

const Home = () => {
  return (
    <div class="contenedor-inicial">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div class="d-flex justify-content-center">
          <ContentRec
            title="Bienvenido a la plataforma digital de SIGEIN,
            en la cual dependiendo de tu rol, podrás realizar diversas acciones "
            bgcolor="#FFFFFF"
          />
        </div>
        <br />
        <div>
          <Link to="/SignIn" className="btn btn-light btn-lg">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
