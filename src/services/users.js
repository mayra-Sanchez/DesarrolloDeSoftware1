import Axios from "axios";
import endpoints from "./index";

const addUser = async (body) => {
  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const token = aux.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
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

const actualizarEstado = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response = await Axios.post(endpoints.users.is_active, body, config);
  console.log(response.data);
  return response.data;
};

export { addUser, loginUser, actualizarEstado };
