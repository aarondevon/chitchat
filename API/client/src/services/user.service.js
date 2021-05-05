/* eslint-disable arrow-body-style */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

const getUsers = async () => {
  const response = await axios.get(`${API_URL}users`, { headers: authHeader() });
  return response.data;
};

export default {
  getUsers,
};
