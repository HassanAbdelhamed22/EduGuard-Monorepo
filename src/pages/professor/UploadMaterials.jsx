import React, { useEffect, useState } from "react";
import { viewRegisteredCourses } from "../../services/professorService";

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

  
  return <div>UploadMaterials</div>;
};

export default UploadMaterials;
