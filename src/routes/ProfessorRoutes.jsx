import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ProfessorLayout from "../layouts/ProfessorLayout";
import Dashboard from "./../pages/professor/Dashboard";
import SecureRoute from "./SecureRoute";

const ProfessorRoutes = () => {
  return (
    <Routes>
      <Route element={<SecureRoute allowedRoles={["professor"]} />}>
        <Route element={<ProfessorLayout />}>
          <Route path="/professor/dashboard" element={<Dashboard />} />
          {/* Add more professor-specific routes */}
        </Route>
      </Route>
    </Routes>
  );
};

export default ProfessorRoutes;
