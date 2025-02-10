import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SecureRoute from "./SecureRoute";
import StudentLayout from "../layouts/StudentLayout";
import ErrorHandler from "../components/errors/ErrorHandler";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/student/Dashboard";
import Profile from "../pages/auth/Profile";
import UpdatePassword from "../pages/auth/UpdatePassword";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route
        element={<SecureRoute allowedRoles={["user"]} />}
        errorElement={<ErrorHandler />}
      >
        <Route element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<div>Course Registration</div>} />
          <Route path="my-courses" element={<div>My Courses</div>} />
          <Route path="quizzes" element={<div>Quizzes</div>} />
          <Route path="quiz-results" element={<div>Quizzes Results</div>} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
