import axios from "axios";
import { BASE_URL } from "../constants";
import api from "../config/api";

export const login = async (credentials) => {
  const { data, status } = await axios.post(
    `${BASE_URL}auth/login`,
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data, status };
};

export const register = async (credentials) => {
  const { data, status } = await axios.post(
    `${BASE_URL}auth/register`,
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data, status };
};

export const resetPass = async (credentials) => {
  const { data, status } = await axios.post(
    `${BASE_URL}auth/forgot-password`,
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data, status };
};

export const sendCode = async (credentials) => {
  const { data, status } = await axios.post(
    `${BASE_URL}auth/reset-password`,
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data, status };
};

export const logout = async () => {
  const { data, status } = await api.post(`${BASE_URL}auth/logout`, null, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { data, status };
};

export const getProfile = async () => {
  const { data, status } = await api.post(`${BASE_URL}auth/profile`, null, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { data, status };
};
