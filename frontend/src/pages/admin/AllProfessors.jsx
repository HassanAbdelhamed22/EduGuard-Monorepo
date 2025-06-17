import React from "react";
import useProfessors from "../../hooks/allProfessors/useProfessors";
import UserManagementPage from "../../components/UserManagementPage";

const AllProfessors = () => {
  const { professors, pagination, isLoading, fetchProfessors } =
    useProfessors();

  return (
    <UserManagementPage
      users={professors}
      pagination={pagination}
      isLoading={isLoading}
      fetchUsers={fetchProfessors}
      pageTitle="All Professors"
    />
  );
};

export default AllProfessors;
