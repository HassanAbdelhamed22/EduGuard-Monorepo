import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { viewCourseMaterials } from "../../services/professorService";
import Loading from "../../components/ui/Loading";
import Section from "../../components/ui/Section";
import { FileText, NotebookPen, Video } from "lucide-react";
import useModal from "../../hooks/courseMaterials/useModal";

const CourseMaterials = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { modal, closeModal, openModal } = useModal();

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

  const handleDelete = async () => {
    try {
      await deleteQuiz(modal.materialId);
      toast.success("Material deleted successfully");
      closeModal();
      fetchMaterials();
    } catch (error) {
      console.error(error);
    }
  };

  // Categorize materials by type
  const categorizedMaterials = {
    pdf: materials.filter((material) => material.MaterialType === "pdf"),
    video: materials.filter((material) => material.MaterialType === "video"),
    notes: materials.filter((material) => material.MaterialType === "text"),
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

      {/* PDF Materials Section */}
      <Section
        title="PDFs"
        materials={categorizedMaterials.pdf}
        icon={FileText}
        iconColor="text-red-500"
      />

      {/* Video Materials Section */}
      <Section
        title="Videos"
        materials={categorizedMaterials.video}
        icon={Video}
        iconColor="text-blue-500"
      />

      {/* Notes Materials Section */}
      <Section
        title="Notes"
        materials={categorizedMaterials.notes}
        icon={NotebookPen}
        iconColor="text-yellow-500"
      />
    </div>
  );
};

export default CourseMaterials;
