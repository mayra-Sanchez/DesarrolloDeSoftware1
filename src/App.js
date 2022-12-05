import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Admin from "./pages/AdminHome";
import Gerente from "./pages/GerenteHome";
import Operador from "./pages/OperadorHome";
import Cliente from "./pages/ClienteHome";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="Admin" element={<Admin />} />
        <Route path="Gerente" element={<Gerente />} />
        <Route path="Operador" element={<Operador />} />
        <Route path="Cliente" element={<Cliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
