import Axios from "axios";
import {endpoints, token} from "./index";

const listAllClients = async () => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };
  const response = await Axios.get(endpoints.clients.listAll, config);
  return response.data;
};

export { listAllClients };
