import React from "react";
import useStudents from "./../../hooks/allStudents/useStudents";
import AllStudentsTable from "../../components/Tables/AllStudentsTable";
import PaginationLogic from "../../components/PaginationLogic";

const AllStudents = () => {
  const { students, pagination, isLoading, fetchStudents } = useStudents();

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchUsers(page);
    }
  };

  const handleBlockToggle = (studentId, newStatus) => {
    // Call API to update block status
    console.log(
      `Student ${studentId} is now ${newStatus ? "Blocked" : "Unblocked"}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-darkGray">All Students</h2>
      </div>

      <AllStudentsTable students={students} onBlockToggle={handleBlockToggle} />

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default AllStudents;
