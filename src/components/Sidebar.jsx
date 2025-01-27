import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { adminItems } from "./../constants/sidebarItems";
import Logo from "./Logo";
import { logout } from "../services/authService";
import { removeUserData } from "../utils/functions";
import toast from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState([]);
  const location = useLocation();

  const toggleExpand = (title) => {
    setExpandedItems((prevItems) =>
      prevItems.includes(title)
        ? prevItems.filter((item) => item !== title)
        : [...prevItems, title]
    );
  };

  const toggleSidebar = (prev) => setIsOpen(!prev);

  const handleLogout = async () => {
    const { data, status } = await logout();
    if (status === 200) {
      removeUserData();
      toast.success(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="h-full bg-white shadow-lg flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-indigo-600 text-white lg:hidden">
        <Logo />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Logo */}
      <div className="hidden lg:block px-6 py-[24px] shadow-sm">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 justify-between shadow-sm">
        <nav className="flex-1 p-4 space-y-2">
          {adminItems.map((item) => (
            <div key={item.title} className="space-y-2">
              {/* Main NavLink for the item */}
              <NavLink
                to={item.path || "#"}
                className={({ isActive }) =>
                  `flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 
                    ${
                      isActive && !item.items?.length
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50"
                    }
                  }`
                }
                end={item.items?.length === 0}
                onClick={() => {
                  if (item.items?.length) {
                    toggleExpand(item.title);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-semibold">{item.title}</span>
                </div>
                {item.items?.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      expandedItems.includes(item.title) ? "rotate-180" : ""
                    }`}
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
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
