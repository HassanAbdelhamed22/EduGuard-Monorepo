import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Student Footer</footer>
    </div>
  );
};

export default StudentLayout;
