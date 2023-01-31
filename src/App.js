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
import UbicacionClientes from "./admin/pages/UbicacionClientes";
import ConsultaCliente from "./operador/pages/ConsultaCliente";
import RegistroPagos from "./operador/pages/RegistroPagos";
import { LoginContext } from "./contex/Logincontext";
import BuscadorCliente from "./gerente/pages/BuscadorCliente";
import PagosRealizados from "./operador/pages/PagosRealizados";
import ConsumoCliente from "./gerente/pages/ConsumoClientes";
import ConsumoMensualC from "./cliente/pages/ConsumoMensualC";
import PagoFacturas from "./cliente/pages/PagoFacturas";
import ConsultaFacV from "./cliente/pages/ConsultaFacturasV";
import InfoClienteA from "./admin/pages/InfoClienteA";
import InfoClienteG from "./gerente/pages/InfoClienteG";
import InfoClienteO from "./operador/pages/InfoClienteO";
import ArchivosPagosA from "./admin/pages/ArchivoPagosA";
import RegitrarCliente from "./admin/pages/RegistrarCliente";

function App() {
  const { isLogged } = useContext(LoginContext);

  return (
    <BrowserRouter>
      {isLogged ? (
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
            path="Gerente/Información-clientes"
            element={<BuscadorCliente />}
          />
          <Route path="Gerente/Gestionar-Clientes" element={<InfoClienteG />} />
          <Route
            path="Operador/Consultar-Cliente"
            element={<ConsultaCliente />}
          />
          <Route
            path="Admin/Consultar-informacion"
            element={<ConsultarInformacion />}
          />
          <Route path="/Admin/Gestionar-Clientes" element={<InfoClienteA />} />
          <Route
            path="Operador/Registar-pagos-realizados"
            element={<PagosRealizados />}
          />
          <Route
            path="/Admin/Registrar_Cliente"
            element={<RegitrarCliente />}
          />
          <Route
            path="Operador/Registrar-pagos-clientes"
            element={<RegistroPagos />}
          />
          <Route
            path="/Admin/Gestionar-Clientes/Admin/Ubicacion"
            element={<UbicacionClientes />}
          />
          <Route path="Gerente/Consumo-clientes" element={<ConsumoCliente />} />
          <Route path="Cliente/consumo-mensual" element={<ConsumoMensualC />} />
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

          <Route path="Admin/Archivos_pagos" element={<ArchivosPagosA />} />
          <Route path="Admin" element={<Admin />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="Admin/Archivos_pagos" element={<ArchivosPagosA />} />
          <Route path="Admin" element={<Admin />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
