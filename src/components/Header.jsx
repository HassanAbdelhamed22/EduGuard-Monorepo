import React, { useState } from "react";
import { Bell, Trash2, Upload } from "lucide-react";
import { profilePicture, username, userRole } from "../constants";
import Logo from "./Logo";
import SearchBar from "./ui/SearchBar";
import { uploadProfilePicture } from "../services/userService";
import toast from "react-hot-toast";

const Header = () => {
  const [profilePictureState, setProfilePictureState] = useState(
    profilePicture || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const getInitials = (name) => name.charAt(0).toUpperCase();

  // Check if profilePicture exists and is not an empty string
  const hasValidProfilePicture =
    profilePicture && profilePicture.trim() !== "" && profilePicture !== "null";

  // ** Handlers
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const response = await uploadProfilePicture(file);
      if (response?.profile_picture) {
        const fullImageUrl = `http://127.0.0.1:8000${response.profile_picture}`;
        setProfilePictureState(fullImageUrl);
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
      await uploadProfilePicture(null);
      window.location.reload();
      toast.success("Profile picture deleted successfully");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      toast.error("Error deleting profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <header className="flex items-center justify-between px-5 py-2 bg-white shadow-sm">
      {/* LOGO*/}

      <div className="flex items-center gap-4">
        <Logo />

        {/* Search Bar*/}
        <SearchBar />
      </div>

      {/* User Info*/}
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 cursor-pointer text-darkGray" />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="font-semibold">{username}</div>
            <div className="text-sm text-primary">{userRole}</div>
          </div>
          <div className="relative group">
            {hasValidProfilePicture ? (
              <img
                src={profilePictureState}
                alt={`${username}'s avatar`}
                className="w-14 h-14 ml-2 rounded-full"
              />
            ) : (
              <div
                className="w-10 h-10 ml-3 flex items-center justify-center rounded-full bg-primary text-white font-semibold"
                title={username}
              >
                {getInitials(username)}
              </div>
            )}

            {/* Upload/Delete overlay */}
            <div className="absolute inset-0 ml-3 flex items-center justify-center rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 opacity-0 group-hover:opacity-100">
              <label className="cursor-pointer p-1 hover:text-blue-400 text-white">
                <Upload className="w-5 h-5" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>
              {hasValidProfilePicture && (
                <button
                  onClick={handleDeletePicture}
                  className="p-1 text-white hover:text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
