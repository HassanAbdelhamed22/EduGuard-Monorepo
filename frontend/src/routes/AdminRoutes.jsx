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
import CreateUserAccount from "../pages/admin/CreateUserAccount";
import AllCourses from "../pages/admin/AllCourses";
import CreateCourse from "../pages/admin/CreateCourse";
import AssignCourse from "../pages/admin/AssignCourse";

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
          <Route path="users/create" element={<CreateUserAccount />} />
          <Route path="students" element={<AllStudents />} />
          <Route path="professors" element={<AllProfessors />} />
          <Route path="courses" element={<AllCourses />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/assign" element={<AssignCourse />} />
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
