import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { username, userRole } from "../constants";
import SearchBar from "./ui/SearchBar";
import toast from "react-hot-toast";
import { getInitials } from "../utils/functions";
import { getProfile } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/slices/profileSlice";

const Header = () => {
  const dispatch = useDispatch();

  // Select profile data from Redux
  const profile = useSelector((state) => state.profile.profile);

  // Check if profilePicture exists and is not an empty string
  const hasValidProfilePicture =
    profile.profile_picture && profile.profile_picture !== "null";

  // ** Handlers
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-white shadow-sm sticky top-0">
      {/* Search Bar*/}
      <SearchBar />

      {/* User Info*/}
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 cursor-pointer text-darkGray" />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="font-semibold">{profile.name}</div>
            <div className="text-sm text-primary">{profile.role}</div>
          </div>
          <div className="relative group">
            {hasValidProfilePicture ? (
              <img
                src={profile.profile_picture}
                alt={`${username}'s avatar`}
                className="w-14 h-14 ml-2 rounded-full"
                loading="lazy"
              />
            ) : (
              <div
                className="w-10 h-10 ml-3 flex items-center justify-center rounded-full bg-primary text-white font-semibold"
                title={profile.name}
              >
                {getInitials(profile.name)}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
