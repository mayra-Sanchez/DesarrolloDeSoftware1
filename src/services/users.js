import Axios from "axios";
import { async } from "q";
import { endpoints, token } from "./index";

const addEmpoloyees = async (body) => {
  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const token = aux.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await Axios.post(
    endpoints.employees.registerEmployees,
    body,
    config
  );
  return response.data;
};

const addClients = async (body) => {
  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const token = aux.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await Axios.post(
    endpoints.clients.registerClients,
    body,
    config
  );
  return response.data;
};

const addUser = async (body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  };

  const response = await Axios.post(endpoints.users.registerUser, body, config);
  return response.data;
};

const loginUser = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response = await Axios.post(endpoints.users.loginUser, body, config);
  return response.data;
};

const actualizarEstado = async (body, id) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  };

  const response = await Axios.patch(
    endpoints.clients.updateClienteInfo(id),
    body,
    config
  );
  console.log(response.data);
  return response.data;
};

const actualizarEstadoEmployes = async (body, id) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  };

  const response = await Axios.patch(
    endpoints.employees.updateEmployesInfo(id),
    body,
    config
  );
  console.log(response.data);
  return response.data;
};

export {
  addEmpoloyees,
  addClients,
  addUser,
  loginUser,
  actualizarEstado,
  actualizarEstadoEmployes,
};
