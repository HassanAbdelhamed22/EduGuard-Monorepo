import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPass from "./../pages/auth/ResetPass";
import SendCode from "./../pages/auth/SendCode";
import PageNotFound from "../pages/PageNotFound";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Default route to redirect to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      {/* Login and Register routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/send-code" element={<SendCode />} />

      {/* Page not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
