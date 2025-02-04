import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { viewCourseMaterials } from "../../services/professorService";
import Loading from "../../components/ui/Loading";

const CourseMaterials = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const fetchMaterials = async () => {
    try {
      const data = await viewCourseMaterials(courseId);
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [courseId]);

  // Categorize materials by type
  const categorizedMaterials = {
    pdf: materials.filter((material) => material.MaterialType === "pdf"),
    video: materials.filter((material) => material.MaterialType === "video"),
    notes: materials.filter((material) => material.MaterialType === "notes"),
  };

  if (loading) {
    return <Loading />;
  }
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
