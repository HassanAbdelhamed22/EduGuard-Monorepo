import React from "react";
import { Outlet } from 'react-router'

const ProfessorLayout = () => {
  return (
    <div className="professor-layout">
      <header>Professor Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Professor Footer</footer>
    </div>
  );
};

export default ProfessorLayout;
