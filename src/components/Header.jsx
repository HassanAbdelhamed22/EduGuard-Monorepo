import React from "react";
import { Search, Bell, List } from "lucide-react";
import { profilePicture, username, userRole } from "../constants";
import Logo from "./Logo";
import SearchBar from "./ui/SearchBar";

const Header = () => {
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
        <Bell className="w-6 h-6 cursor-pointer text-black-900" />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="font-semibold">{username}</div>
            <div className="text-sm text-purple-600">{userRole}</div>
          </div>
          <img
            src={profilePicture}
            alt="User avatar"
            className="w-12 h-12 ml-3 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
