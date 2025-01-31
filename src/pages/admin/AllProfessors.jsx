import React, { useState } from "react";
import useProfessors from "../../hooks/allProfessors/useProfessors";
import Loading from "../../components/ui/Loading";
import { suspendStudent, unSuspendStudent } from "../../services/adminService";
import toast from "react-hot-toast";
import PaginationLogic from "../../components/PaginationLogic";
import AllStudentsTable from "../../components/Tables/AllStudentsTable";
import Modal from "../../components/ui/Modal";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";

const AllProfessors = () => {
  const { professors, pagination, isLoading, fetchProfessors } =
    useProfessors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessors, setSelectedProfessors] = useState(null);
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
    setSelectedProfessors(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProfessors(null);
    setIsModalOpen(false);
    setReason("");
  };

  const handleConfirmBlock = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason to block the student");
      return;
    }

    try {
      await suspendStudent(selectedProfessors.id, reason);
      toast.success("Student has been blocked successfully");
      fetchProfessors(pagination.current_page);
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleBlockToggle = async (professor) => {
    if (professor.is_blocked) {
      try {
        await unSuspendStudent(professor.id);
        toast.success("Student has been unblocked successfully");
        fetchProfessors(pagination.current_page);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      openModal(professor);
    }
  };

  if (isLoading && professors.length === 0) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-darkGray">All Professors</h2>
      </div>

      <AllStudentsTable students={professors} onBlockToggle={handleBlockToggle} />

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

export default AllProfessors;
