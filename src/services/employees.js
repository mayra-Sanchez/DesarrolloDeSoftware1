import Axios from "axios";
import {endpoints, token} from "./index";

const listAllEmployees = async () => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`
    },
  };
  const response = await Axios.get(endpoints.employees.listAll, config);
  return response.data;
};

export { listAllEmployees };
