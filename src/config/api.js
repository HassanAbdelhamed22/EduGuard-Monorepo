import axios from "axios";
import { token, tokenExpiry } from "../constants";
import toast from "react-hot-toast";
import { removeUserData } from "../utils/functions";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    if (token && Date.now() > Number(tokenExpiry)) {
      try {
        const refreshResponse = await api.post(
          "http://127.0.0.1:8000/api/auth/refresh",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Refresh Response:", refreshResponse.data);

        const newToken = refreshResponse.data.token;
        localStorage.setItem("token", newToken);
        localStorage.setItem(
          "tokenExpiry",
          (
            Date.now() +
            Number(refreshResponse.data.expires_in) * 1000
          ).toString()
        );

        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        toast.error("Session expired. Please log in again");
        removeUserData();
        window.location.href = "/login";
        return Promise.reject(error);
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
