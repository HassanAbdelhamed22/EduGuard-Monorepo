import toast from "react-hot-toast";
import api from "../config/api";
import { BASE_URL } from "../constants";

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('profile_picture', file);

  const { data } = await api.post(`${BASE_URL}users/profile/upload-profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteProfilePicture = async () => {
  const { data } = await api.delete(`${BASE_URL}users/profile/delete-profile-picture`);
  return data;
};

export const suspendUser = async (id, reason) => {
  const { data, status } = await api.post(`users/students/${id}/suspend`, {
    reason,
  });
  return { data, status };
};

export const unSuspendUser = async (id) => {
  const { data, status } = await api.post(`users/students/${id}/unsuspend`);
  return { data, status };
};