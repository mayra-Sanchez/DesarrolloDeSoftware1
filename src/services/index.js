const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    getAll: `${URL}/cliente`,
  },

  users: {
    registerUser: `${URL}/users/register-user/`,
    loginUser: `${URL}/users/login/`,
    updateActive: (id) => `${URL}/users/${id}/update-info/`,
  },

  roles: {},
};

module.exports = endpoints;
