import toast from "react-hot-toast";
import api from "../config/api";
import { BASE_URL } from "../constants";

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('profile_picture', file);

  const { data } = await api.post(`${BASE_URL}auth/profile/upload-profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteProfilePicture = async () => {
  const { data } = await api.delete(`${BASE_URL}auth/profile/delete-profile-picture`);
  return data;
};
