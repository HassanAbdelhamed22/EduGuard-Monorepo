import React from "react";
import useStudents from "./../../hooks/allStudents/useStudents";
import UserManagementPage from "../../components/UserManagementPage";

const AllStudents = () => {
  const { students, pagination, isLoading, fetchStudents } = useStudents();

  return (
    <UserManagementPage
      users={students}
      pagination={pagination}
      isLoading={isLoading}
      fetchUsers={fetchStudents}
      pageTitle="All Students"
    />
  );
};

export default AllStudents;
