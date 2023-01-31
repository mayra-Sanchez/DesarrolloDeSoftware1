const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    listAll: `${URL}/clients/list-all/`,
  },

  users: {
    registerClients: `${URL}clients/create-client/`,
    registerEmployees: `${URL}/employees/create-employee/`,
    loginUser: `${URL}/users/login/`,
    updateActive: (id) => `${URL}/users/${id}/update-info/`,
  },

  energy: {
    energy_payments: `${URL}/energy-products/list-energy-consumptions/`,
  },

  roles: {},
};

module.exports = endpoints;
