import React from "react";

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
