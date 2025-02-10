import React, { useEffect, useState } from "react";
import { allCourses, registerCourses } from "../../services/studentService";
import toast from "react-hot-toast";

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

  const handleRegister = async () => {
    try {
      const response = await registerCourses(selectedCourse);
      const { data, status } = response;
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


  return <div>CourseRegistration</div>;
};

export default CourseRegistration;
