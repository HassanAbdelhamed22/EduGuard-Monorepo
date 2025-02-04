import React from "react";
import { useLocation, useParams } from "react-router-dom";

const CourseMaterials = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };
  return (
    <div className="container p-4 mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {courseName} ({courseCode})
        </h1>
        <p className="text-lg text-gray-600">Materials</p>
      </div>
    </div>
  );
};

export default CourseMaterials;
