const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    registerClients: `${URL}clients/create-client/`,
    listAll: `${URL}/clients/list-all/`,
    updateClienteInfo: (id) => `${URL}/clients/update-info/${id}/`,
    client_bill: (id) => `${URL}/bills/user_bill/${id}/`,
  },

  employees: {
    registerEmployees: `${URL}/employees/create-employee/`,
    listAll: `${URL}/employees/list-all/`,
    updateEmployesInfo: (id) => `${URL}/employees/update-info/${id}/`,
  },

  users: {
    registerEmployees: `${URL}/employees/create-employee/`,
    loginUser: `${URL}/users/login/`,
  },

  energy: {
    energy_payments: `${URL}/energy-products/list-energy-consumptions/`,
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
