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
        },
      }
    );
    
    const data = await response.data;
    if (!response.ok) {
      toast.error(data.message || 'Failed to upload profile picture');
    }

    // Update the profile picture URL in localStorage
    const fullImageUrl = `${BASE_URL}storage/${data.profile_picture}`;
    localStorage.setItem("profilePicture", fullImageUrl);

    return data;
  } catch (error) {
    toast.error("Error uploading profile picture:", error);
    return null;
  }
};
