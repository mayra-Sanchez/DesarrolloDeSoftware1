import Axios from "axios";
import endpoints from "./index";

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
    endpoints.users.registerEmployees,
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
    },
  };

  const response = await Axios.patch(
    endpoints.users.updateActive(id),
    body,
    config
  );
  console.log(response.data);
  return response.data;
};

export { addEmpoloyees, addClients, loginUser, actualizarEstado };
