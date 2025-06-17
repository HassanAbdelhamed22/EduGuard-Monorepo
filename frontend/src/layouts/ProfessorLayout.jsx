import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "./../components/Sidebar";

const ProfessorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col h-screen">
        <div className="sticky top-0 z-50 w-full">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-gray-100/50">
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfessorLayout;
