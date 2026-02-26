// frontend/src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL:"https://cms-gzq3.onrender.com/api",
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;