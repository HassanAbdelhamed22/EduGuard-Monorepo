import React, { useEffect, useState } from "react";
import { deleteProfilePicture, getProfile } from "../../services/userService";
import { updateProfile } from "./../../services/authService";

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  profile_picture: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setProfile(data.data || defaultProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(profile);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const response = await uploadProfilePicture(file);
      if (response?.profile_picture) {
        const fullImageUrl = `http://127.0.0.1:8000${response.profile_picture}`;
        setProfile((prev) => ({ ...prev, profile_picture: fullImageUrl }));
        toast.success("Profile picture uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Error uploading profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePicture = async () => {
    try {
      setIsUploading(true);
      await deleteProfilePicture();
      setProfile((prev) => ({ ...prev, profile_picture: null }));
      toast.success("Profile picture deleted successfully");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      toast.error("Error deleting profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const hasValidProfilePicture =
    profile.profile_picture && profile.profile_picture !== "null";

  return <div>Profile</div>;
};

export default Profile;
