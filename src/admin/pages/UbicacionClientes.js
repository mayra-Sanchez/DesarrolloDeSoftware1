import "../hojaestilo/UbicacionCliente.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo-2.png";
import { ContenedorUbicacion } from "../components/ContenedorUbicacion";

const UbicacionClientes = () => {
    return (
        <div class="contenedor-ubicacion">
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
            <ContenedorUbicacion
                texto1_Ubicacion = "Ubicación clientes"
            />
        </div>
    );
};
export default UbicacionClientes;
