import React, { useState } from "react";
import toast from "react-hot-toast";
import { createCourse } from "./../../services/adminService";
import CreateCourseForm from "../../components/forms/CreateCourseForm";

const CreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    CourseCode: "",
    CourseName: "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { data, status } = await createCourse(values);

      if (status === 200) {
        toast.success(data.message);
        // Reset form values
        initialValues.CourseCode = "";
        initialValues.CourseName = "";
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-white mt-20">
      <h2 className="text-2xl font-semibold mb-6 pb-4 text-center border-b text-primary">
        Create User Account
      </h2>

      <CreateCourseForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateCourse;
