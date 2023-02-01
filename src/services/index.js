const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    registerClients: `${URL}clients/create-client/`,
    listAll: `${URL}/clients/list-all/`,
    client_bill: (id) => `${URL}/bills/user_bill/${id}/`
  },

  employees: {
    registerEmployees: `${URL}/employees/create-employee/`,
    listAll: `${URL}/employees/list-all/`,
  },

  users: {
    registerUser: `${URL}/users/register-user/`,
    loginUser: `${URL}/users/login/`,
    updateActive: (id) => `${URL}/users/${id}/update-info/`,
  },

  energy: {
    list_energy_consumption: `${URL}/energy-products/list-energy-consumptions/`,
    client_energy_consumption: (id) => `${URL}/energy-products/energy_consumption/${id}/`,
    csv_energy_consumptions: `${URL}/energy-products/csv-energy-consumptions/`
  },

  roles: {},
};

const token = () => {
  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const tokenAcces = aux.access;
  return tokenAcces;
};

export { endpoints, token };
