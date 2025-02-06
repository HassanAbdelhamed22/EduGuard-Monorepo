import React, { useEffect, useState } from "react";
import {
  uploadMaterials,
  viewRegisteredCourses,
} from "../../services/professorService";
import toast from "react-hot-toast";
import UploadMaterialForm from "./../../components/forms/UploadMaterialForm";

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
    course_id: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);

    try {
      if (!selectedCourse) {
        toast.error("Please select a course");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("material_type", values.material_type);
      formData.append("course_id", selectedCourse?.course_id);

      // Validate and append file
      if (values.material_type === "pdf" && values.file) {
        formData.append("file", values.file);
      } else if (values.material_type === "video" && values.video) {
        formData.append("video", values.video);
      } else if (values.material_type === "text") {
        // Do nothing
      }
       else {
        toast.error("Invalid file. Please upload a valid file.");
        setIsLoading(false);
        return;
      }

      // Log FormData to ensure file is attached
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await uploadMaterials(formData);

        toast.success('Material uploaded successfully');
        resetForm();
        setSelectedCourse(null);

    } catch (error) {
      console.error("Error submitting material:", error);
      toast.error("Error submitting material. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-white mt-10">
      <h2 className="text-2xl font-semibold mb-6 pb-4 text-center border-b text-primary">
        Upload Course Materials
      </h2>

      <UploadMaterialForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        courses={courses}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />
    </div>
  );
};

export default UploadMaterials;
