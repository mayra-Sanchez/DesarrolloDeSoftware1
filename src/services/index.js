const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    getAll: `${URL}/cliente`,
  },

  users: {
    registerUser: `${URL}/users/register-user/`,
    loginUser: `${URL}/users/login/`,
  },

  roles: {},
};

module.exports = endpoints;
