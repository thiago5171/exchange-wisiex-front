import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000";

const backendClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

backendClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backendClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const navigate = useNavigate();
      navigate("/login");

      console.error("Não autorizado. Redirecionando para login...");
    }
    return Promise.reject(error);
  }
);

export default backendClient;
