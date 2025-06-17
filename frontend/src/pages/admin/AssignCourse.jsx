import React, { useState } from "react";
import useCourses from "../../hooks/allCourses/useCourses";
import useProfessors from "../../hooks/allProfessors/useProfessors";
import { assignCourse } from "../../services/adminService";
import Button from "../../components/ui/Button";
import Combobox from "../../components/ui/Combobox";
import toast from "react-hot-toast";

const AssignCourse = () => {
  const { courses, isLoading: coursesLoading } = useCourses();
  const { professors, isLoading: professorsLoading } = useProfessors();
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!selectedProfessor || !selectedCourse) {
      toast.error("Please select a professor and a course.");
      return;
    }

    const payload = {
      CourseID: selectedCourse.id,
      ProfessorID: selectedProfessor.id,
    };
  
    setLoading(true);
    try {
      await assignCourse(selectedCourse.id, selectedProfessor.id);
      toast.success("Course assigned successfully");
      setSelectedProfessor(null);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error assigning course:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const mappedCourses = courses.map((course) => ({
    ...course,
    name: course.CourseName,
    id: course.CourseID,
  }));

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white mt-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-6 pb-4 text-center border-b text-primary">
          Assign Course to Professor
        </h2>
      </div>

      {/* Professor Selection */}
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="professor" className="text-gray-600 mb-2">
          Select Professor:
        </label>

        {professorsLoading ? (
          <div className="w-full max-w-xs h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : (
          <Combobox
            id="professor"
            options={professors}
            selected={selectedProfessor}
            setSelected={setSelectedProfessor}
            placeholder="Choose a professor"
            displayValue={(option) => option.name}
          />
        )}
      </div>

      {/* Course Selection */}
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="course" className="text-gray-600 mb-2 left-0">
          Select Course:
        </label>
        {coursesLoading ? (
          <div className="w-full max-w-xs h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : (
          <Combobox
            id="course"
            options={mappedCourses}
            selected={selectedCourse}
            setSelected={setSelectedCourse}
            placeholder="Choose a course"
            displayValue={(option) => option.name}
          />
        )}
      </div>

      {/* Assign Button */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={handleAssign}
          isLoading={loading}
          disabled={loading || !selectedProfessor || !selectedCourse}
          className="w-full max-w-xs"
        >
          {loading ? "Assigning..." : "Assign Course"}
        </Button>
      </div>
    </div>
  );
};

export default AssignCourse;
