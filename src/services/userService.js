import axios from "axios";
import { BASE_URL, token } from "../constants";
import toast from "react-hot-toast";

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profile_picture", file);

  try {
    const response = await axios.post(
      `${BASE_URL}auth/profile/upload-profile-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    const data = response.data;
    if (response.status !== 200) {
      toast.error(data.message || 'Failed to upload profile picture');
    }

    // Update the profile picture URL in localStorage
    const fullImageUrl = `http://127.0.0.1:8000${data.profile_picture}`;
    localStorage.setItem("profilePicture", fullImageUrl);

    return data;
  } catch (error) {
    toast.error("Error uploading profile picture:", error);
    return null;
  }
};

export const deleteProfilePicture = async () => {
  try {
    const response = await axios.delete(
      `${BASE_URL}auth/profile/delete-profile-picture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("profilePicture");
    return response.data;
  } catch (error) {
    toast.error("Error deleting profile picture:", error);
    return null;
  }
};