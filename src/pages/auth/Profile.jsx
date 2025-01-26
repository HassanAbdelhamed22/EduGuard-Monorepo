import React, { useState } from 'react'

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
  
  return (
    <div>Profile</div>
  )
}

export default Profile