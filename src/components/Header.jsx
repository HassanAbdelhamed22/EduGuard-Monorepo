import React, { useState } from "react";
import { Bell, Trash2, Upload } from "lucide-react";
import { profilePicture, username, userRole } from "../constants";
import Logo from "./Logo";
import SearchBar from "./ui/SearchBar";
import {
  deleteProfilePicture,
  uploadProfilePicture,
} from "../services/userService";
import toast from "react-hot-toast";

const Header = () => {
  const [profilePictureState, setProfilePictureState] = useState(
    profilePicture || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const getInitials = (name) => name.charAt(0).toUpperCase();

  // Check if profilePicture exists and is not an empty string
  const hasValidProfilePicture =
    profilePictureState &&
    profilePictureState.trim() !== "" &&
    profilePictureState !== "null";

  // ** Handlers


  return (
    <header className="flex items-center justify-between px-5 py-3 bg-white shadow-sm sticky top-0">
      {/* Search Bar*/}
      <SearchBar />

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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
