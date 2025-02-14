import React, { useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import { username, userRole } from "../constants";
import SearchBar from "./ui/SearchBar";
import { getInitials } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>

      {/* User Info*/}
      <div className="flex items-center gap-4">
        <Bell
          className="w-6 h-6 cursor-pointer text-darkGray"
          onClick={() => navigate("/student/notifications")}
        />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="font-semibold">{profile.name}</div>
            <div className="text-sm text-primary">
              {profile?.role === "user"
                ? "Student"
                : profile?.role
                ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
                : ""}
            </div>
          </div>
          <div className="relative group">
            {hasValidProfilePicture ? (
              <img
                src={profile.profile_picture}
                alt={`${username}'s avatar`}
                className="w-14 h-14 ml-2 rounded-full object-cover"
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
