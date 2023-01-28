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

  roles: {},
};

module.exports = endpoints;
