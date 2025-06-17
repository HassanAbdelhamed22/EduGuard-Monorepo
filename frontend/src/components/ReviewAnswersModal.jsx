import { useState } from "react";
import Modal from "./ui/Modal";
import { resetCheatingScore } from "../services/professorService";
import toast from "react-hot-toast";
import StudentAnswers from "../pages/student/StudentAnswers";

const ReviewAnswersModal = ({
  isOpen,
  closeModal,
  studentId,
  quizId,
  onUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetCheating = async () => {
    setIsLoading(true);
    try {
      const response = await resetCheatingScore(quizId, studentId);
      if (response.status === 200) {
        toast.success("Score reset successfully!");
        onUpdate(response.quiz_result);
        closeModal();
      } else {
        throw new Error(response.message || "Failed to reset cheating score");
      }
    } catch (error) {
      console.error("Error resetting cheating score:", error);
      toast.error(
        error?.response?.data?.message || "Failed to reset cheating score"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Review Answers for Student ID: ${studentId}`}
      description="View the student's answers and reset their cheating score."
      className="!max-w-5xl w-full"
    >
      <div className="mt-4 max-h-[60vh] overflow-y-auto">
        <StudentAnswers studentId={studentId} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
          onClick={closeModal}
          disabled={isLoading}
        >
          Close
        </button>
        <button
          type="button"
          className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
          onClick={handleResetCheating}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Reset Cheating Score"}
        </button>
      </div>
    </Modal>
  );
};

export default ReviewAnswersModal;
