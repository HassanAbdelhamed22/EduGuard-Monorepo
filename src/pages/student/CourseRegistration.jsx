import React, { useEffect, useState } from "react";
import {
  allCourses,
  registerCourses,
  unregisterCourses,
} from "../../services/studentService";
import toast from "react-hot-toast";
import Loading from "./../../components/ui/Loading";
import Button from "../../components/ui/Button";
import CustomCheckbox from "../../components/ui/Checkbox";

const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const data = await allCourses();
      setCourses(data.courses);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseId) => {
    setSelectedCourse((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  const handleRegister = async () => {
    console.log("Selected Courses:", selectedCourse); // Debugging
    if (selectedCourse.length === 0) {
      toast.error("Please select at least one course before registering.");
      return;
    }

    try {
      const { data, status } = await registerCourses({
        CourseIDs: selectedCourse,
      });
      if (status === 200) {
        toast.success(data.message);
        setSelectedCourse([]);
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error registering courses:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUnregister = async () => {
    console.log("Selected Courses:", selectedCourse); // Debugging
    if (selectedCourse.length === 0) {
      toast.error("Please select at least one course before registering.");
      return;
    }

    try {
      const { data } = await unregisterCourses({ CourseIDs: selectedCourse });
      toast.success(data.message);
      setSelectedCourse([]);
    } catch (error) {
      console.error("Error unregistering courses:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-6 pb-4 text-primary border-b">
        Courses Registration
      </h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse rounded-lg">
          <thead className="bg-indigo-100 rounded-lg">
            <tr className="text-left text-gray-900">
              <th className="p-3 border-b border-gray-200"> </th>
              <th className="p-3 border-b border-gray-200">Courses Code</th>
              <th className="p-3 border-b border-gray-200">Courses Name</th>
              <th className="p-3 border-b border-gray-200">Professor Name</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.CourseID}
                className="text-gray-700 hover:bg-indigo-50 duration-300"
              >
                {/* Checkbox Column */}
                <td className="p-3 border-b border-gray-200 text-center">
                  <CustomCheckbox
                    checked={selectedCourse.includes(course.CourseID)}
                    onChange={() => handleCheckboxChange(course.CourseID)}
                  />
                </td>
                {/* Course Code */}
                <td className="p-3 border-b border-gray-200">
                  {course.CourseCode}
                </td>
                {/* Course Name */}
                <td className="p-3 border-b border-gray-200">
                  {course.CourseName}
                </td>
                {/* Professor Name */}
                <td className="p-3 border-b border-gray-200">
                  {course.professor ? course.professor.name : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          onClick={handleRegister}
          variant={"default"}
          disabled={selectedCourse.length === 0}
        >
          Register
        </Button>
        <Button
          onClick={handleUnregister}
          variant={"danger"}
          disabled={selectedCourse.length === 0}
        >
          Unregister
        </Button>
      </div>
    </div>
  );
};

export default CourseRegistration;
