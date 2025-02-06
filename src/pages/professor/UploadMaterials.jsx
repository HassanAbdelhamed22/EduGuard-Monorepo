import React, { useEffect, useState } from "react";
import { uploadMaterials, viewRegisteredCourses } from "../../services/professorService";
import toast from "react-hot-toast";

const UploadMaterials = () => {
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
    material_type: "pdf",
    file: null,
    video: null,
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
      const response = await uploadMaterials(payload);
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

  return <div>UploadMaterials</div>;
};

export default UploadMaterials;
