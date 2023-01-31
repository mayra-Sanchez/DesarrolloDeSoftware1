import Axios from "axios";
import {endpoints, token} from "./index";

const energy_payment = async (body) => {
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
