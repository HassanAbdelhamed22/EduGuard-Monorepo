import React, { useEffect, useState } from "react";
import { allCourses } from "../../services/studentService";

const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const { data } = await allCourses();
      setCourses(data);
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
    setSelectedCourse((prevSelected) => {
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId];
    });
  };


  return <div>CourseRegistration</div>;
};

export default CourseRegistration;
