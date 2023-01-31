import Axios from "axios";
import endpoints from "./index";

const energy_payment = async (body) => {
  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const token = aux.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await Axios.get(
    endpoints.energy.energy_payments,
    body,
    config
  );
  return response.data;
};

export { energy_payment };
