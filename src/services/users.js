import Axios from "axios";
import {endpoints, token} from "./index";

const addUser = async (body) => {
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

export { addUser, loginUser, actualizarEstado };
