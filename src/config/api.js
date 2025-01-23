import axios from "axios";
import { token, tokenExpiry } from "../constants";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    if (token && Date.now() > tokenExpiry) {
      try {
        const refreshResponse = await axios.post("auth/refresh", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newToken = refreshResponse.data.token;
        localStorage.setItem("token", newToken);
        localStorage.setItem(
          "tokenExpiry",
          Date.now() + refreshResponse.data.tokenExpiry * 1000
        );

        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        toast.error("Error refreshing token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        window.location.href = "/login";
      }
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
