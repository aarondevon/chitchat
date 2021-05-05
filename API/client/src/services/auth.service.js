/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import jwt from 'jwt-decode';

const API_URL = '/api/';

const register = (username, password) => {
  return axios.post(`${API_URL}register`, {
    username,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(`${API_URL}login`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  return jwt(localStorage.getItem('token'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
