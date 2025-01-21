import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Default route to redirect to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      {/* Login and Register routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AuthRoutes;
