import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createQuiz,
  viewRegisteredCourses,
} from "../../services/professorService";
import CreateQuizForm from "../../components/forms/CreateQuizForm";

const CreateQuiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const { data } = await viewRegisteredCourses();
      if (data) {
        // Transform the courses data for the combobox
        const transformedCourses = data.map((course) => ({
          course_id: course.CourseID,
          name: `${course.CourseName} (${course.CourseCode})`,
        }));
        setCourses(transformedCourses);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const initialValues = {
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    quiz_date: "",
    course_id: selectedCourse?.id || "",
  };

  const handleSubmit = async (values, formikHelpers) => {
    setIsLoading(true);
    try {
      const { resetForm } = formikHelpers;
      const payload = {
        ...values,
        course_id: selectedCourse?.course_id || "",
      };

      if (!selectedCourse) {
        toast.error("Please select a course");
        setIsLoading(false);
        return;
      }
      const response = await createQuiz(payload);
      const { data, status } = response;
      if (status === 201) {
        toast.success(data.message);
        resetForm();
        setSelectedCourse(null);
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CreateQuizForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      courses={courses}
      selectedCourse={selectedCourse}
      setSelectedCourse={setSelectedCourse}
    />
  );
};
export default CreateQuiz;
