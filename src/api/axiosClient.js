import axios from "axios";

const baseUrl = "http://localhost:8080";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => JSON.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

export default axiosClient;
