import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Admin Footer</footer>
    </div>
  );
};

export default AdminLayout;
