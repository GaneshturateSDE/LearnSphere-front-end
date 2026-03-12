import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
axios.defaults.baseURL =  "http://localhost:8085/api";

axios.interceptors.request.use((config) => {
    // const {token}=useAuth()
    const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const API=axios;

export default API;