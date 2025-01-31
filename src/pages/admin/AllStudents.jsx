import React from "react";
import useStudents from "./../../hooks/allStudents/useStudents";
import AllStudentsTable from "../../components/Tables/AllStudentsTable";
import PaginationLogic from "../../components/PaginationLogic";
import toast from "react-hot-toast";
import { suspendStudent, unSuspendStudent } from "../../services/adminService";

const AllStudents = () => {
  const { students, pagination, isLoading, fetchStudents } = useStudents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reason, setReason] = useState("");

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchUsers(page);
    }
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
    setReason("");
  };

  const handleConfirmBlock = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason to block the student");
      return;
    }

    try {
      await suspendStudent(selectedStudent.id, reason);
      toast.success("Student has been blocked successfully");
      fetchStudents(pagination.current_page);
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleBlockToggle = async (student) => {
    if (student.is_blocked) {
      try {
        await unSuspendStudent(student.id);
        toast.success("Student has been unblocked successfully");
        fetchStudents(pagination.current_page);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      openModal(student);
    }
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
