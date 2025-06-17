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
import QuizViewDetails from "../pages/professor/ViewQuizDetails";
import ViewResults from "../pages/professor/QuizResult";
import ShowResult from "../pages/professor/ShowResult";
import ShowCheaters from "../pages/professor/ShowCheaters";
import CheatingDetails from "../pages/professor/CheatingDetails";
import NotificationsPage from './../pages/student/NotificationsPage';

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

          <Route path="quizzes/create" element={<CreateQuiz></CreateQuiz>} />
          <Route path="quizzes/add-questions" element={<AddQuestion />} />
          <Route path="quizzes/View-Result" element={<ViewResults />} />
          <Route
            path="quiz/:quizId"
            element={<QuizViewDetails></QuizViewDetails>}
          />
          <Route path="quiz/results/:quizId" element={<ShowResult />} />
          <Route path="quiz/cheaters/:quizId" element={<ShowCheaters />} />
          <Route path="quiz/:quizId/:studentId/cheating-logs" element={<CheatingDetails />} />

          <Route path="notifications" element={<NotificationsPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ProfessorRoutes;
