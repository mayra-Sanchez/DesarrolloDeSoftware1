const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    listAll: `${URL}/clients/list-all/`,
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

let aux = localStorage.getItem("userData");
aux = JSON.parse(aux);
const token = aux.access;

export { endpoints, token };
