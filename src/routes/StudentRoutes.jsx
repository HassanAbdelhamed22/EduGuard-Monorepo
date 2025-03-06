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
import CourseRegistration from "../pages/student/CourseRegistration";
import MyCourses from "../pages/student/MyCourses";
import CourseMaterials from "../pages/student/CourseMaterials";
import MyQuizzes from "../pages/student/MyQuizzes";
import QuizInterface from "../pages/student/QuizInterface";
import QuizzesResults from "../pages/student/QuizzesResults";
import StudentAnswers from "../pages/student/StudentAnswers";
import NotificationsPage from "../pages/student/NotificationsPage";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route
        element={<SecureRoute allowedRoles={["user"]} />}
        errorElement={<ErrorHandler />}
      >
        <Route element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CourseRegistration />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="materials/:courseId" element={<CourseMaterials />} />
          <Route path="quizzes" element={<MyQuizzes />} />
          <Route path="quiz-results" element={<QuizzesResults />} />
          <Route path="quiz/answers/:quizId" element={<StudentAnswers />} />
          <Route path="notifications" element={<NotificationsPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>

        <Route path="quiz/:quizId" element={<QuizInterface />} />
        
        {/* Page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
