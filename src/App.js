import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import SignIn from './pages/SignIn'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Home />} />
    <Route path="signin" element={<SignIn />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
