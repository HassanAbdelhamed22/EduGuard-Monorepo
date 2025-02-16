import React, { useCallback, useMemo, useState } from "react";
import useCourses from "../../hooks/allCourses/useCourses";
import useModal from "../../hooks/allCourses/useModal";
import Loading from "../../components/ui/Loading";
import AllCoursesTable from "../../components/Tables/AllCoursesTable";
import PaginationLogic from "../../components/PaginationLogic";
import { deleteCourse, updateCourse } from "../../services/adminService";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import UpdateCourseForm from "../../components/forms/UpdateCourseForm";
import Modal from "../../components/ui/Modal";
import SearchBar from "../../components/ui/SearchBar";

const AllCourses = () => {
  const { courses, pagination, isLoading, fetchCourses } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = useCallback(
    (page) => {
      if (
        page !== pagination.current_page &&
        page > 0 &&
        page <= pagination.total_pages
      ) {
        fetchCourses(page);
      }
    },
    [pagination, fetchCourses]
  );

  const openModal = (type, course) => {
    setSelectedCourse(course);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setModalType(null);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (course) => {
    if (!course?.CourseID) {
      toast.error("Invalid course selected");
      return;
    }
    openModal("delete", course);
  };

  const handleEditClick = (course) => {
    if (!course?.CourseID) {
      toast.error("Invalid course selected");
      return;
    }
    openModal("edit", course);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCourse?.CourseID) {
      toast.error("Invalid course selected");
      return;
    }

    try {
      await deleteCourse(selectedCourse.CourseID);
      toast.success("Course deleted successfully");
      closeModal();
      fetchCourses(pagination.current_page);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete course");
    }
  };

  const handleUpdate = async (values) => {
    if (!selectedCourse?.CourseID) {
      toast.error("Invalid course selected");
      return;
    }

    const updatedFields = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== selectedCourse[key] && value !== ""
      )
    );

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No fields have been updated.");
      return;
    }

    try {
      const response = await updateCourse(
        selectedCourse.CourseID,
        updatedFields
      );
      if (response.status === 200) {
        toast.success("Course updated successfully");
        closeModal();
        fetchCourses(pagination.current_page);
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during update."
      );
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const courseName = course.CourseName.toLowerCase();
      const courseCode = course.CourseCode.toLowerCase();
      const query = searchQuery.toLowerCase();
      return courseName.includes(query) || courseCode.includes(query);
    });
  }, [courses, searchQuery]);

  const renderModalContent = () => {
    if (modalType === "delete") {
      return (
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </div>
      );
    }

    if (modalType === "edit" && selectedCourse) {
      return (
        <UpdateCourseForm
          initialValues={selectedCourse}
          onSubmit={handleUpdate}
          isLoading={isLoading}
          closeModal={closeModal}
        />
      );
    }

    return null;
  };

  if (isLoading && courses.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-darkGray">All Courses</h2>
        <div className="w-1/3">
          <SearchBar
            placeholder="Search by course name or code..."
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <AllCoursesTable
          courses={filteredCourses}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      ) : (
        <p className="text-mediumGray text-center">No courses found.</p>
      )}

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
      />

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={modalType === "delete" ? "Delete Course" : "Edit Course"}
        description={
          modalType === "delete"
            ? "Are you sure you want to delete this course? This action cannot be undone."
            : "Update course information"
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default AllCourses;
