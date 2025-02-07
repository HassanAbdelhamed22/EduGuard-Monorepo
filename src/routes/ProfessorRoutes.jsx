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
import CreateQuiz from "../pages/professor/CreateQuiz";
import CourseQuizzes from "../pages/professor/CourseQuizzes";
import CourseMaterials from "../pages/professor/CourseMaterials";
import UploadMaterials from "../pages/professor/UploadMaterials";
import RegisteredStudent from "../pages/professor/RegisteredStudent";
import AddQuestion from "../pages/professor/AddQuestion";

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
          <Route path="courses/upload-material" element={<UploadMaterials />} />
          <Route
            path="course/:courseId/students"
            element={<RegisteredStudent />}
          />
          <Route
            path="courses/manage-material"
            element={<div>Manage Course Material</div>}
          />

          <Route path="quizzes" element={<div>My Quizzes</div>} />
          <Route path="quizzes/create" element={<CreateQuiz></CreateQuiz>} />
          <Route path="quizzes/add-questions" element={<AddQuestion />} />
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
