import React from "react";
import { Routes, Route } from "react-router-dom";
import SecureRoute from "./SecureRoute";
import Dashboard from './../pages/admin/Dashboard';
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<SecureRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more admin-specific routes */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
