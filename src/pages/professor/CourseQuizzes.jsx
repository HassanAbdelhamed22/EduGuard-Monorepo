import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteQuiz,
  updateQuiz,
  viewCourseQuizzes,
} from "../../services/professorService";
import Loading from "../../components/ui/Loading";
import { FileQuestion, Filter, Search } from "lucide-react";
import Button from "../../components/ui/Button";
import useModal from "../../hooks/CourseQuizzes/useModal";
import toast from "react-hot-toast";
import Modal from "../../components/ui/Modal";
import UpdateQuizForm from "../../components/forms/UpdateQuizForm";

const CourseQuizzes = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { modal, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("nearest");

  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const fetchQuizzes = async () => {
    try {
      const data = await viewCourseQuizzes(courseId);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [courseId]);

  const handleDeleteQuiz = async () => {
    try {
      await deleteQuiz(modal.quizId);
      toast.success("Quiz deleted successfully");
      closeModal();
      fetchQuizzes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (values) => {
    const updatedFields = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== modal.quizData[key] && value !== ""
      )
    );

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No fields have been updated.");
      return;
    }

    try {
      const { data, status } = await updateQuiz(modal.quizId, updatedFields);
      if (status === 200) {
        toast.success("Course updated successfully");
        closeModal();
        fetchQuizzes();
      } else {
        toast.error("Failed to update course");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "An error occurred during update."
      );
    }
  };

  const initialValues = {
    title: modal.quizData?.Title || "",
    description: modal.quizData?.Description || "",
    quiz_date: modal.quizData?.QuizDate
      ? new Date(modal.quizData.QuizDate).toISOString().split("T")[0]
      : "",
    start_time: modal.quizData?.StartTime
      ? new Date(modal.quizData.StartTime).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    end_time: modal.quizData?.EndTime
      ? new Date(modal.quizData.EndTime).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
  };

  const filteredQuizzes = quizzes
    .filter((quiz) =>
      quiz.Title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.StartTime);
      const dateB = new Date(b.StartTime);
      return sortOrder === "nearest" ? dateA - dateB : dateB - dateA;
    });

  const renderModalContent = () => {
    if (modal.type === "delete") {
      return (
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteQuiz}>
            Delete
          </Button>
        </div>
      );
    }

    if (modal.type === "edit") {
      return (
        <UpdateQuizForm
          initialValues={modal.quizData}
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
        <p className="text-lg text-gray-600">Quizzes</p>
      </div>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Quiz Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none w-full md:w-56 pl-10 pr-4 py-3 border border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg cursor-pointer bg-white"
          >
            <option value="nearest">Sort by Nearest Date</option>
            <option value="longest">Sort by Farthest Date</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {filteredQuizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.QuizID}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer flex flex-col justify-between"
            >
              <div
                className="flex items-center gap-4"
                onClick={() => {
                  navigate(`/professor/quiz/${quiz.QuizID}`);
                }}
                title="View Quiz Details"
              >
                <div className="p-3 bg-indigo-50 rounded-full">
                  <FileQuestion className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {quiz.Title}
                  </h2>
                  <p className="text-sm text-gray-600">{quiz.Description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Date: {new Date(quiz.QuizDate).toLocaleDateString()}</p>
                    <div className="flex gap-4">
                      <p>
                        Start:{" "}
                        {new Date(quiz.StartTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>
                        End:{" "}
                        {new Date(quiz.EndTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p>Duration: {quiz.Duration} minutes</p>
                    <p>Total Marks: {quiz.TotalMarks} marks</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="flex gap-4 mt-6">
                  <Button
                    variant="cancel"
                    onClick={() => {
                      openModal("edit", quiz.QuizID, quiz);
                    }}
                    fullWidth
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => {
                      openModal("delete", quiz.QuizID);
                    }}
                    fullWidth
                  >
                    Delete
                  </Button>
                </div>

                <Button
                  variant="default"
                  className="w-full mt-2"
                  onClick={() => {
                    navigate(`/professor/quiz/${quiz.QuizID}`, {
                      state: {
                        courseName: courseName,
                        courseCode: courseCode,
                      },
                    });
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default CourseQuizzes;
