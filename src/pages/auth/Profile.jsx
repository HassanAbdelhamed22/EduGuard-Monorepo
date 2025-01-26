import React, { useEffect, useState } from 'react'
import { getProfile } from '../../services/userService'

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  profile_picture: "",
}

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
      setIsLoading(true);
      const { data } = await getProfile();
      setProfile(data.data || defaultProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>Profile</div>
  )
}

export default Profile