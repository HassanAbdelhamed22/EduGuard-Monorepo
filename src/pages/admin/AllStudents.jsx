import React, { useState } from "react";
import useStudents from "./../../hooks/allStudents/useStudents";
import AllStudentsTable from "../../components/Tables/AllStudentsTable";
import PaginationLogic from "../../components/PaginationLogic";
import toast from "react-hot-toast";
import { suspendStudent, unSuspendStudent } from "../../services/adminService";
import Modal from "../../components/ui/Modal";
import Textarea from "./../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";

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

  if (isLoading && students.length === 0) {
    return <Loading />;
  }

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

      {/* Suspension Reason Modal */}
      <Modal isOpen={isModalOpen} title="Block Student" closeModal={closeModal}>
        <div className="mt-2">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Reason for blocking student
          </label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason..."
            className="mt-1 p-2 w-full border rounded-md"
            rows="3"
          ></Textarea>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={closeModal} variant={"cancel"}>
            Cancel
          </Button>
          <Button onClick={handleConfirmBlock} variant={"danger"}>
            Block
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AllStudents;
