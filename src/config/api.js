import axios from "axios";
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
    const storedToken = localStorage.getItem("token");
    const storedTokenExpiry = localStorage.getItem("tokenExpiry");

    if (storedToken && Date.now() > Number(storedTokenExpiry)) {
      try {
        const refreshResponse = await axios.post(
          "http://127.0.0.1:8000/api/auth/refresh",
          null,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        console.log("Refresh Response:", refreshResponse.data);

        const newToken = refreshResponse.data.token;
        const newTokenExpiry = (
          Date.now() +
          Number(refreshResponse.data.expires_in) * 1000
        ).toString();

        // Update localStorage with the new token and expiry
        localStorage.setItem("token", newToken);
        localStorage.setItem("tokenExpiry", newTokenExpiry);

        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        console.error("Token refresh failed:", error);

        // Clear user data and redirect to login page
        removeUserData();
        toast.error("Session expired. Please log in again");

        // Open login page in a new tab
        window.open("/login", "_blank");

        // Reject the request to prevent hanging
        return Promise.reject(error);
      }
    } else if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
