import React from "react";
import { Routes, Route } from "react-router-dom";
import SecureRoute from "./SecureRoute";
import Dashboard from "./../pages/admin/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import Profile from "../pages/auth/Profile";
import UpdatePassword from "../pages/auth/UpdatePassword";
import ErrorHandler from "../components/errors/ErrorHandler";
import PageNotFound from "../pages/PageNotFound";
import AllUsers from "../pages/admin/AllUsers";
import AllStudents from "../pages/admin/AllStudents";
import AllProfessors from "../pages/admin/AllProfessors";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={<SecureRoute allowedRoles={["admin"]} />}
        errorElement={<ErrorHandler />}
      >
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="users/create" element={<div>Create User</div>} />
          <Route path="students" element={<AllStudents />} />
          <Route path="professors" element={<AllProfessors />} />
          <Route path="courses" element={<div>Courses List</div>} />
          <Route path="courses/create" element={<div>Create Course</div>} />
          <Route path="courses/assign" element={<div>Assign Course</div>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
