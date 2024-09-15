
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Login function
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  const { token, username } = response.data;
  return { token, username };
};

// Logout function
export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};

// Fetch employees
export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/employees`, {
    headers: { 'x-auth-token': localStorage.getItem('token') },
  });
  return response.data;
};

// Create a new employee
export const createEmployee = async (employeeData) => {
  const formData = new FormData();
  for (const key in employeeData) {
    formData.append(key, employeeData[key]);
  }
  const response = await axios.post(`${API_URL}/auth/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': localStorage.getItem('token'),
    },
  });
  return response.data;
};

// Update an employee
export const updateEmployee = async (employeeId, employeeData) => {
  const formData = new FormData();
  for (const key in employeeData) {
    formData.append(key, employeeData[key]);
  }
  const response = await axios.put(`${API_URL}/employees/${employeeId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': localStorage.getItem('token'),
    },
  });
  return response.data;
};

// Delete an employee
export const deleteEmployee = async (employeeId) => {
  const response = await axios.delete(`${API_URL}/employees/${employeeId}`, {
    headers: { 'x-auth-token': localStorage.getItem('token') },
  });
  return response.data;
};
