import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ProfessorRoutes from "./routes/ProfessorRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import UnauthorizedPage from "./pages/auth/Unauthorized";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <Toaster position="top-center" />

      <Router>
        <Routes>
          {/* Authentication routes */}
          <Route path="/*" element={<AuthRoutes />} />

          {/* Admin-specific routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Professor-specific routes */}
          <Route path="/professor/*" element={<ProfessorRoutes />} />

          {/* Student-specific routes */}
          <Route path="/student/*" element={<StudentRoutes />} />

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
