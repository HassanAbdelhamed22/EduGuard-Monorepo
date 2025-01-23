import React from "react";
import { Bell } from "lucide-react";
import { profilePicture, username, userRole } from "../constants";
import Logo from "./Logo";
import SearchBar from "./ui/SearchBar";

const Header = () => {
  const getInitials = (name) => name.charAt(0).toUpperCase();

  console.log("Profile Picture:", profilePicture); // Debugging log
  console.log("Username:", getInitials(username)); // Debugging log

  // Check if profilePicture exists and is not an empty string
  const hasValidProfilePicture = profilePicture && profilePicture.trim() !== "" && profilePicture !== "null";

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
          {hasValidProfilePicture ? (
            <img
              src={profilePicture}
              alt={`${username}'s avatar`}
              className="w-12 h-12 ml-3 rounded-full"
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
    </header>
  );
};

export default Header;
