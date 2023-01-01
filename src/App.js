import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./Home/pages/Home";
import SignIn from "./SignIn/pages/SignIn";
import Admin from "./admin/pages/AdminHome";
import Gerente from "./gerente/pages/GerenteHome";
import Operador from "./operador/pages/OperadorHome";
import Cliente from "./cliente/pages/ClienteHome";
import RegistrarUsuario from "./admin/pages/RegistrarUsuario";
import ConsultarInformacion from "./admin/pages/ConsultarInformacion";
import ConsultaCliente from "./operador/pages/ConsultaCliente";
import AutenticarUsuario from "./admin/pages/AutenticarUsuario";
import { LoginContext } from "./contex/Logincontext";
import BuscadorCliente from "./gerente/pages/BuscadorCliente";

function App() {
  const { isLogged } = useContext(LoginContext);

  return (
    <BrowserRouter>
      {!isLogged ? (
        <Routes>
          <Route path="Admin" element={<Admin />} />
          <Route path="Gerente" element={<Gerente />} />
          <Route path="Operador" element={<Operador />} />
          <Route path="Cliente" element={<Cliente />} />
          <Route
            path="Admin/Registrar-Usuarios"
            element={<RegistrarUsuario />}
          />
          <Route
            path="Gerente/Gestionar-Clientes"
            element={<BuscadorCliente />}
          />
          <Route
            path="Operador/Consultar-Cliente"
            element={<ConsultaCliente />}
          />
          <Route
            path="Admin/Autenticar-Usuario"
            element={<AutenticarUsuario />}
          />
          <Route
            path = "Admin/Consultar-informacion"
            element = {<ConsultarInformacion />}
          />
          <Route index element={<Home />} />
          <Route path="SignIn" element={<SignIn />} />
        </Routes>
      ) : (
        <Routes>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
