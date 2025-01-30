import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true, // Allows session cookies to be sent
});

export default axiosInstance;