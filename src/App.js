import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./Home/pages/Home";
import SignIn from "./SignIn/pages/SignIn";
import Admin from "./admin/pages/AdminHome";
import Gerente from "./gerente/pages/GerenteHome";
import Operador from "./operador/pages/OperadorHome";
import RegistrarUsuario from "./admin/pages/RegistrarUsuario";
import ConsultarInformacion from "./admin/pages/ConsultarInformacion";
import ConsultarInformacionEmpleado from "./admin/pages/ConsultarInfoEmpleado";
import UbicacionClientes from "./admin/pages/UbicacionClientes";
import ConsultaCliente from "./operador/pages/ConsultaCliente";
import RegistroPagos from "./operador/pages/RegistroPagos";
import { LoginContext } from "./contex/Logincontext";
import BuscadorCliente from "./gerente/pages/BuscadorCliente";
import PagosRealizados from "./operador/pages/PagosRealizados";
import ConsumoCliente from "./gerente/pages/ConsumoClientes";
import PagoFacturas from "./cliente/pages/PagoFacturas";
import ConsultaFacV from "./cliente/pages/ConsultaFacturasV";
import InfoClienteA from "./admin/pages/InfoClienteA";
import InfoClienteG from "./gerente/pages/InfoClienteG";
import InfoClienteO from "./operador/pages/InfoClienteO";
import ArchivosPagosA from "./admin/pages/ArchivoPagosA";
import ClienteHome from "./cliente/pages/ClienteHome";
import RegistrarCliente from "./admin/pages/RegistrarCliente";

function App() {
  const { isLogged } = useContext(LoginContext);

  return (
    <BrowserRouter>
      {isLogged ? (
        <Routes>
          <Route path="Admin" element={<Admin />} />
          <Route path="Gerente" element={<Gerente />} />
          <Route path="Operador" element={<Operador />} />
          <Route path="Cliente" element={<ClienteHome />} />
          <Route
            path="Admin/Registrar-Usuarios"
            element={<RegistrarUsuario />}
          />
          <Route
            path="Admin/Registrar-usuarios/Admin/Registrar_Cliente"
            element={<RegistrarCliente />}
          />
          <Route
            path="Admin/Consultar-informacion"
            element={<ConsultarInformacion />}
          />
          <Route
            path="Admin/Consultar-informacion-empleados"
            element={<ConsultarInformacionEmpleado />}
          />
          <Route path="/Admin/Gestionar-Clientes" element={<InfoClienteA />} />
          <Route
            path="/Admin/Gestionar-Clientes/Admin/Ubicacion"
            element={<UbicacionClientes />}
          />
          <Route path="Admin/Archivos_pagos" element={<ArchivosPagosA />} />
          <Route
            path="Gerente/Información-clientes"
            element={<BuscadorCliente />}
          />
          <Route path="Gerente/Gestionar-Clientes" element={<InfoClienteG />} />
          <Route path="Gerente/Consumo-clientes" element={<ConsumoCliente />} />
          <Route
            path="Operador/Consultar-Cliente"
            element={<ConsultaCliente />}
          />

          <Route
            path="Operador/Registar-pagos-realizados"
            element={<PagosRealizados />}
          />
          <Route
            path="Operador/Registrar-pagos-clientes"
            element={<RegistroPagos />}
          />

          <Route
            path="Cliente/pagar-facturas-online"
            element={<PagoFacturas />}
          />
          <Route
            path="Cliente/consultar-facturas-vencidas"
            element={<ConsultaFacV />}
          />
          <Route index element={<Home />} />
          <Route path="SignIn" element={<SignIn />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path="SignIn" element={<SignIn />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
