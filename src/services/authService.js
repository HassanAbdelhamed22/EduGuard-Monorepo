import axios from "axios";
import { BASE_URL } from "../constants";

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
