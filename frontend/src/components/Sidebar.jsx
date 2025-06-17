import { ChevronDown, LogOut } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userRole } from "../constants";
import {
  adminItems,
  professorItems,
  studentItems,
} from "./../constants/sidebarItems";
import Logo from "./Logo";
import { logout } from "../services/authService";
import { removeUserData } from "../utils/functions";
import toast from "react-hot-toast";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState([]);
  const roleItems = {
    admin: adminItems,
    professor: professorItems,
    student: studentItems,
  };

  const sidebarItems = roleItems[userRole] || studentItems; // Default to studentItems if role is undefined

  const toggleExpand = (title) => {
    setExpandedItems((prevItems) =>
      prevItems.includes(title)
        ? prevItems.filter((item) => item !== title)
        : [...prevItems, title]
    );
  };

  const handleLogout = async () => {
    const { data, status } = await logout();
    if (status === 200) {
      removeUserData();
      toast.success("Successfully logged out, you will be redirected to login");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 bg-white shadow-lg flex flex-col
        transition-all duration-300 overflow-hidden
        ${isOpen ? "w-64" : "w-0"}
        lg:relative
      `}
    >
      <div
        className={`
        flex flex-col h-full w-64
        transition-transform duration-300
        ${!isOpen && "-translate-x-full"}
        ${!isOpen && "lg:hidden"}
      `}
      >
        {/* Header */}
        <div className="p-4 border-b py-6">
          <Logo />
        </div>

        {/* Main Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.title} className="space-y-2">
              <NavLink
                to={item.path || "#"}
                className={({ isActive }) =>
                  `flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 
                    ${
                      isActive && !item.items?.length
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50"
                    }`
                }
                end={item.items?.length === 0}
                onClick={() => item.items?.length && toggleExpand(item.title)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {item.items?.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 
                    ${expandedItems.includes(item.title) ? "rotate-180" : ""}`}
                  />
                )}
              </NavLink>

              {/* Sub-items */}
              {expandedItems.includes(item.title) && item.items?.length > 0 && (
                <div className="pl-8 space-y-1 mt-2">
                  {item.items.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm duration-200 rounded-lg ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 font-medium"
                            : "text-gray-600 hover:bg-indigo-50 hover:text-gray-900"
                        }`
                      }
                      end
                    >
                      <span>{subItem.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t mt-auto">
          <button
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
