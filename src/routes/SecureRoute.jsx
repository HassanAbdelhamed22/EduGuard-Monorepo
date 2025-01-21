import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { token, userRole } from "../constants";

const SecureRoute = ({ allowedRoles }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default SecureRoute;
