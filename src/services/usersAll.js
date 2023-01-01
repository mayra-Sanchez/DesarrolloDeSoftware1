import Axios from "axios";
import endpoints from "./index";

const getAllUsers = async () => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response = await Axios.get(endpoints.users.getAll, config);
  return response.data;
};

const getAllClients = async () => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await Axios.get(endpoints.users.getAll, config);
  return response.data;
};

export { getAllUsers, getAllClients };
