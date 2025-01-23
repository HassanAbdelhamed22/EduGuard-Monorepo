import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const ProfessorLayout = () => {
  return (
    <div className="professor-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Professor Footer</footer>
    </div>
  );
};

export default ProfessorLayout;
