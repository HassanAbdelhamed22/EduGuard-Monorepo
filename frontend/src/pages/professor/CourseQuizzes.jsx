import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import PaginationLogic from "./../../components/PaginationLogic";
import SearchBar from "../../components/ui/SearchBar";
import SortDropdown from "../../components/ui/SortDropdown";
import debounce from "lodash/debounce";

const CourseQuizzes = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { modal, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("nearest");
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });

  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const fetchQuizzes = async (page, search = "", sort = "nearest") => {
    setLoading(true);
    try {
      const response = await viewCourseQuizzes(courseId, {
        page,
        search,
        sort_order: sort,
      });
      setQuizzes(response.quizzes);
      setPagination({ ...response.pagination, current_page: page });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  // Effect for pagination changes
  const handlePageChange = useCallback(
    (page) => {
      if (
        page !== pagination.current_page &&
        page > 0 &&
        page <= pagination.total_pages
      ) {
        setPagination((prev) => ({ ...prev, current_page: page }));
      }
    },
    [pagination]
  );

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
        toast.success("Quiz updated successfully");
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle enter key press
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchQuizzes(1, searchTerm, sortOrder);
    }
  };

  useEffect(() => {
    fetchQuizzes(1, searchTerm, sortOrder);
  }, [sortOrder]);

  const displayQuizzes = quizzes;

  const sortingOptions = [
    { value: "nearest", label: "Sort by Nearest Date" },
    { value: "longest", label: "Sort by Farthest Date" },
  ];

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
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onEnter={handleSearchEnter}
          placeholder="Search quizzes..."
        />

        {/* Sorting Dropdown */}
        <SortDropdown
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPagination((prev) => ({ ...prev, current_page: 1 }));
          }}
          options={sortingOptions}
        />
      </div>

      {displayQuizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayQuizzes.map((quiz) => (
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

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
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

export default CourseQuizzes;
