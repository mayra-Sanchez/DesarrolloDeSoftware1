import Axios from "axios";
import { endpoints, token } from "./index";

const listAllClients = async () => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  };
  const response = await Axios.get(endpoints.clients.listAll, config);
  return response.data;
};

const clientBill = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
      responseType: "blob",
    },
  };
  const response = await Axios.get(
    endpoints.clients.client_bill(body.id),
    config
  );
  return response.data;
};

export { listAllClients, clientBill };
