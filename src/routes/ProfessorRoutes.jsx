import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ProfessorLayout from "../layouts/ProfessorLayout";
import Dashboard from "./../pages/professor/Dashboard";
import SecureRoute from "./SecureRoute";
import ErrorHandler from "../components/errors/ErrorHandler";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/auth/Profile";
import UpdatePassword from "../pages/auth/UpdatePassword";
import CourseList from "../pages/professor/MyCourses";
import CourseQuizzes from "../pages/professor/CourseQuizzes";
import CourseMaterials from "../pages/professor/CourseMaterials";

const ProfessorRoutes = () => {
  return (
    <Routes>
      <Route
        element={<SecureRoute allowedRoles={["professor"]} />}
        errorElement={<ErrorHandler />}
      >
        <Route element={<ProfessorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CourseList></CourseList>} />
          <Route path="quizzes/:courseId" element={<CourseQuizzes />} />
          <Route path="materials/:courseId" element={<CourseMaterials />} />
          <Route
            path="courses/upload-material"
            element={<div>Upload Material</div>}
          />
          <Route
            path="courses/manage-material"
            element={<div>Manage Course Material</div>}
          />

          <Route path="quizzes" element={<div>My Quizzes</div>} />
          <Route path="quizzes/create" element={<div>Create Quiz</div>} />
          <Route
            path="quizzes/add-questions"
            element={<div>Add Questions</div>}
          />
          <Route
            path="quizzes/manage-questions"
            element={<div>Manage Questions</div>}
          />
          <Route path="quizzes/view-list" element={<div>View Quiz List</div>} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ProfessorRoutes;
