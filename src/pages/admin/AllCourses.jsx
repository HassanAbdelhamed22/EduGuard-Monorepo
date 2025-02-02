import React from "react";
import useCourses from "../../hooks/allCourses/useCourses";
import useModal from "./../../hooks/allCourses/useModal";
import Loading from "../../components/ui/Loading";
import AllCoursesTable from "../../components/Tables/AllCoursesTable";
import PaginationLogic from "../../components/PaginationLogic";
import { deleteCourse, updateCourse } from "../../services/adminService";
import toast from "react-hot-toast";

const AllCourses = () => {
  const { courses, pagination, isLoading, fetchCourses } = useCourses();
  const { modal, openModal, closeModal } = useModal();

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchCourses(page);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(modal.userId);
      toast.success("Course deleted successfully");
      closeModal();
      fetchCourses(pagination.current_page);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const { data, status } = await updateCourse(modal.userId, values);
      if (status === 200) {
        toast.success("Course updated successfully");
        closeModal();
        fetchCourses(pagination.current_page);
      } else {
        toast.error("Failed to update course");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(
        err?.response?.data?.message || "An error occurred during update."
      );
    }
  };

  if (isLoading && courses.length === 0) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-darkGray">All Courses</h2>
      </div>

      <AllCoursesTable
        courses={courses}
        onDelete={(id) => openModal("delete", id)}
      />

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default AllCourses;
