import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ProfessorLayout from "../layouts/ProfessorLayout";
import Dashboard from "./../pages/professor/Dashboard";
import SecureRoute from "./SecureRoute";
import ErrorHandler from "../components/errors/ErrorHandler";
import PageNotFound from "../pages/PageNotFound";

const ProfessorRoutes = () => {
  return (
    <Routes>
      <Route
        element={<SecureRoute allowedRoles={["professor"]} />}
        errorElement={<ErrorHandler />}
      >
        <Route element={<ProfessorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more professor-specific routes */}

          {/* Page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ProfessorRoutes;
