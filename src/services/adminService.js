import api from "../config/api";
import { BASE_URL } from "../constants";

export const getStatistics = async () => {
  const { data } = await api.get(`${BASE_URL}admin/statistics`);
  return data;
};

export const getResentActivities = async () => {
  const { data } = await api.get(`${BASE_URL}admin/recent-activities`);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await api.get(`${BASE_URL}admin/users`);
  return data;
};

export const updateUserAccount = async (id, data) => {
  const { data: response } = await api.patch(`${BASE_URL}admin/users/${id}`, data);
  return response;
};

export const deleteUserAccount = async (id) => {
  const { data: response } = await api.delete(`${BASE_URL}admin/users/${id}`);
  return response;
};

export const assignRole = async (id, role) => {
  const { data: response } = await api.post(`${BASE_URL}admin/users/assign-role`, { id, role });
  return response;
}