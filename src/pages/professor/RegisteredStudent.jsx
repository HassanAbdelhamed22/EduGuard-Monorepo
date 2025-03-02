import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import Modal from "../../components/ui/Modal";
import PaginationLogic from "../../components/PaginationLogic";
import RegisteredStudentTable from "../../components/Tables/RegisteredStudentTable";
import Loading from "../../components/ui/Loading";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router";
import { fetchCourseRegistrations } from "../../services/professorService";
import { suspendUser, unSuspendUser } from "../../services/userService";

const RegisteredStudent = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchUsers(page);
    }
  };

  const fetchStudents = async (page) => {
    setIsLoading(true);
    try {
      const { data, pagination } = await fetchCourseRegistrations(
        courseId,
        page
      );

      // Extract student objects from response
      const formattedStudents = data.map(
        (registration) => registration.student
      );

      setStudents(formattedStudents);
      setPagination({ ...pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1);
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setReason("");
  };

  const handleConfirmBlock = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason to block the user");
      return;
    }

    try {
      await suspendUser(selectedUser.id, reason);
      toast.success("User has been blocked successfully");
      // Update the students state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedUser.id
            ? { ...student, is_suspended: true }
            : student
        )
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleBlockToggle = async (user) => {
    if (user.is_suspended) {
      try {
        await unSuspendUser(user.id);
        toast.success("User has been unblocked successfully");

        // Update the students state
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === user.id
              ? { ...student, is_suspended: false }
              : student
          )
        );
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      openModal(user);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-darkGray">
          Students Registered in {courseName} ({courseCode})
        </h2>
      </div>

      <RegisteredStudentTable
        users={students}
        onBlockToggle={handleBlockToggle}
      />

      {students.length > 0 && (
        <PaginationLogic
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      )}

      {/* Suspension Reason Modal */}
      <Modal isOpen={isModalOpen} title="Block User" closeModal={closeModal}>
        <div className="mt-2">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Reason for blocking user
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

export default RegisteredStudent;
