const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    registerClients: `${URL}clients/create-client/`,
    listAll: `${URL}/clients/list-all/`,
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
