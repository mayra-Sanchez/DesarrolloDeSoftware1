import Axios from "axios";
import endpoints from "./index";

const listAllClients = async () => {
  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const token = aux.access;
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
