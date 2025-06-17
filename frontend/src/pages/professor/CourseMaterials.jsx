import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  deleteMaterial,
  updateMaterial,
  viewCourseMaterials,
} from "../../services/professorService";
import Loading from "../../components/ui/Loading";
import Section from "../../components/ui/Section";
import { FileText, NotebookPen, Video } from "lucide-react";
import useModal from "../../hooks/courseMaterials/useModal";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import UpdateMaterialForm from "../../components/forms/UpdateMaterialForm";

const CourseMaterials = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
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
      await deleteMaterial(modal.materialId);
      toast.success("Material deleted successfully");
      closeModal();
      fetchMaterials();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
      };

      const { data, status } = await updateMaterial(modal.materialId, payload);

      if (status === 200) {
        toast.success("Material updated successfully");
        // Update the local state
        setMaterials((prevMaterials) =>
          prevMaterials.map((material) =>
            material.MaterialID === modal.materialId
              ? {
                  ...material,
                  Title: values.title,
                  Description: values.description,
                }
              : material
          )
        );
        closeModal();
        //fetchMaterials();
      } else {
        toast.error("Failed to update material");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error(
        err.response?.data?.message ||
          "An error occurred during update. Please check your input."
      );
    } finally {
      setLoading(false);
    }
  };

  // Categorize materials by type
  const categorizedMaterials = {
    pdf: materials.filter((material) => material.MaterialType === "pdf"),
    video: materials.filter((material) => material.MaterialType === "video"),
    notes: materials.filter((material) => material.MaterialType === "text"),
  };

  const renderModalContent = () => {
    if (modal.type === "delete") {
      return (
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      );
    }

    if (modal.type === "edit") {
      return (
        <UpdateMaterialForm
          initialValues={modal.materialData}
          onSubmit={handleUpdate}
          isLoading={loading}
          closeModal={closeModal}
        />
      );
    }
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
        openModal={openModal}
      />

      {/* Video Materials Section */}
      <Section
        title="Videos"
        materials={categorizedMaterials.video}
        icon={Video}
        iconColor="text-blue-500"
        openModal={openModal}
      />

      {/* Notes Materials Section */}
      <Section
        title="Notes"
        materials={categorizedMaterials.notes}
        icon={NotebookPen}
        iconColor="text-yellow-500"
        openModal={openModal}
      />

      <Modal
        isOpen={modal.isOpen}
        closeModal={closeModal}
        title={
          modal.type === "delete"
            ? "Delete Quiz"
            : modal.type === "edit"
            ? "Edit Quiz"
            : ""
        }
        description={
          modal.type === "delete"
            ? "Are you sure you want to delete this quiz? This action cannot be undone."
            : modal.type === "edit"
            ? "Update quiz information"
            : ""
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default CourseMaterials;
