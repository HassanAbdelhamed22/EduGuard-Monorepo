import React, { useCallback, useMemo, useState } from "react";
import useCourses from "../../hooks/allCourses/useCourses";
import useModal from "./../../hooks/allCourses/useModal";
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
  const { modal, openModal, closeModal } = useModal();
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleDelete = useCallback(async () => {
    try {
      await deleteCourse(modal.courseId);
      toast.success("Course deleted successfully");
      closeModal();
      fetchCourses(pagination.current_page);
    } catch (error) {
      toast.error(error.message);
    }
  }, [modal.courseId, closeModal, fetchCourses, pagination.current_page]);

  const handleUpdate = useCallback(
    async (values) => {
      const updatedFields = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== modal.courseData[key] && value !== ""
        )
      );

      if (Object.keys(updatedFields).length === 0) {
        toast.error("No fields have been updated.");
        return;
      }

      try {
        const { data, status } = await updateCourse(
          modal.courseId,
          updatedFields
        );
        if (status === 200) {
          toast.success("Course updated successfully");
          closeModal();
          fetchCourses(pagination.current_page);
        } else {
          toast.error("Failed to update course");
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "An error occurred during update."
        );
      }
    },
    [
      modal.courseId,
      modal.courseData,
      closeModal,
      fetchCourses,
      pagination.current_page,
    ]
  );

  // search by course name or code
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCourses = courses.filter((course) => {
    const courseName = course.CourseName.toLowerCase();
    const courseCode = course.CourseCode.toLowerCase();
    const query = searchQuery.toLowerCase();
    return courseName.includes(query) || courseCode.includes(query);
  });

  const renderModalContent = useMemo(() => {
    if (modal.type === "delete") {
      return (
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      );
    }

    if (modal.type === "edit" && modal.courseData) {
      return (
        <UpdateCourseForm
          initialValues={modal.courseData}
          onSubmit={handleUpdate}
          isLoading={isLoading}
          closeModal={closeModal}
        />
      );
    }
    return null;
  }, [modal, handleDelete, handleUpdate, closeModal, isLoading]);

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
          openModal={openModal}
          isLoading={isLoading}
        />
      ) : (
        <p className="text-mediumGray text-center">No courses found.</p>
      )}

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
      />

      <Modal
        isOpen={modal.isOpen}
        closeModal={closeModal}
        title={
          modal.type === "delete"
            ? "Delete Course"
            : modal.type === "edit"
            ? "Edit Course"
            : ""
        }
        description={
          modal.type === "delete"
            ? "Are you sure you want to delete this course? This action cannot be undone."
            : modal.type === "edit"
            ? "Update course information"
            : ""
        }
      >
        {renderModalContent}
      </Modal>
    </div>
  );
};

export default AllCourses;
