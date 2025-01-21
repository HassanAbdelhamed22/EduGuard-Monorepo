import React from "react";
import { Outlet } from "react-router";

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <header>Student Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Student Footer</footer>
    </div>
  );
};

export default StudentLayout;
