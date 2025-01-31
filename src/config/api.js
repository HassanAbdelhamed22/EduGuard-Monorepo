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

        // Handle different types of errors
        if (error.response) {
          // Backend returned an error response
          toast.error("Session expired. Please log in again");
        } else if (error.request) {
          // No response received (network error)
          toast.error("Network error. Please check your connection.");
        } else {
          // Something went wrong in the request setup
          toast.error("An error occurred. Please try again.");
        }

        // Clear user data and redirect to login page
        removeUserData();
        window.open("/login", "_blank"); // Open login page in a new tab

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

// Add a response interceptor to handle token expiry globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      console.error("Unauthorized access:", error);

      // Clear user data and redirect to login page
      removeUserData();
      toast.error("Session expired. Please log in again");
      window.open("/login", "_blank"); // Open login page in a new tab
    }
    return Promise.reject(error);
  }
);

// Function to check token expiry and auto-logout
const checkTokenExpiry = () => {
  const storedToken = localStorage.getItem("token");
  const storedTokenExpiry = localStorage.getItem("tokenExpiry");

  if (storedToken && Date.now() > Number(storedTokenExpiry)) {
    // Token is expired
    removeUserData();
    toast.error("Session expired. Please log in again");
    window.open("/login", "_blank"); // Open login page in a new tab
  }
};

// Check token expiry on page load
window.addEventListener("load", checkTokenExpiry);

// Check token expiry every 5 minutes
setInterval(checkTokenExpiry, 5 * 60 * 1000);

export default api;
