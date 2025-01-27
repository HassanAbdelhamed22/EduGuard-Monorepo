import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <div className="sticky top-0 z-50 w-full">
            <Header />
          </div>

          {/* Scrollable Outlet Content */}
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
