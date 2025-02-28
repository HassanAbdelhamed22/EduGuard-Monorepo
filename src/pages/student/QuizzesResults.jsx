import React, { useEffect, useState } from "react";
import {
  getQuizResult,
  getSubmittedQuizzes,
} from "../../services/studentService";
import { CircleAlert, CircleCheck, FileQuestion } from "lucide-react";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";
import PaginationLogic from "../../components/PaginationLogic";
import Modal from "../../components/ui/Modal";
import { useNavigate } from "react-router-dom";

const QuizzesResults = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isResultLoading, setIsResultLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchQuizDetails(page);
    }
  };

  const fetchQuizDetails = async (page) => {
    try {
      setIsPageLoading(true);
      const response = await getSubmittedQuizzes(page);
      setQuizDetails(response.data);
      setPagination({ ...response.pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails(pagination.current_page);
  }, []);

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "B+";
    if (percentage >= 75) return "B";
    if (percentage >= 70) return "C+";
    if (percentage >= 65) return "C";
    if (percentage >= 60) return "D+";
    if (percentage >= 50) return "D";
    return "F";
  };

  const handleShowResult = async (quiz) => {
    try {
      setIsModalOpen(true);
      setIsResultLoading(true);
      setSelectedQuiz(quiz);
      const response = await getQuizResult(quiz.quiz_details.id);
      setQuizResult(response);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResultLoading(false);
    }
  };

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Quizzes Results</h1>
      {quizDetails.length === 0 ? (
        <p className="text-gray-600">No results available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quizDetails.map((quiz) => (
            <div
              key={quiz.quiz_details.id}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer flex flex-col h-full justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-full">
                  <FileQuestion className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {quiz.quiz_details.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {quiz.course_details.name} ({quiz.course_details.code})
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      Date:{" "}
                      {new Date(
                        quiz.quiz_details.quiz_date
                      ).toLocaleDateString()}
                    </p>
                    <div className="flex gap-4">
                      <p>
                        Start:{" "}
                        {new Date(
                          quiz.quiz_details.start_time
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>
                        End:{" "}
                        {new Date(
                          quiz.quiz_details.end_time
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p>Duration: {quiz.quiz_details.duration} minutes</p>
                    <p>Total Marks: {quiz.quiz_details.total_marks} marks</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleShowResult(quiz)}
                >
                  Show Result
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
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
          setQuizResult(null);
          setSelectedQuiz(null);
        }}
        title={selectedQuiz ? selectedQuiz.quiz_details.title : "Quiz Result"}
      >
        {isResultLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          quizResult &&
          selectedQuiz && (
            <div className="space-y-6">
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedQuiz.course_details.name} (
                  {selectedQuiz.course_details.code})
                </h3>
                <p className="text-sm text-gray-600">
                  Date:{" "}
                  {new Date(
                    selectedQuiz.quiz_details.quiz_date
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 p-4">
                {quizResult.passed === 1 ? (
                  <>
                    <CircleCheck className="w-20 h-20 text-green-600" />
                    <p className="text-lg font-semibold text-green-600">
                      Congratulations! You passed the quiz.
                    </p>
                  </>
                ) : (
                  <>
                    <CircleAlert className="w-20 h-20 text-red-600" />
                    <p className="text-base font-semibold text-red-600">
                      You did not pass the quiz. Better luck next time!
                    </p>
                  </>
                )}
              </div>

              <div className="flex justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Your Score</p>
                  <p className="text-2xl font-bold text-primary">
                    {quizResult.score} / {selectedQuiz.quiz_details.total_marks}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Grade</p>
                  <p className="text-2xl font-bold text-primary">
                    {getGrade(quizResult.percentage)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Percentage</p>
                  <p className="text-2xl font-bold text-primary">
                    {quizResult.percentage}%
                  </p>
                </div>
              </div>

              <div>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() =>
                    navigate(
                      `/student/quiz/answers/${selectedQuiz.quiz_details.id}`,
                      {
                        state: {
                          courseName: selectedQuiz.course_details.name,
                          courseCode: selectedQuiz.course_details.code,
                        },
                      }
                    )
                  }
                >
                  Show Your Answers
                </Button>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
};

export default QuizzesResults;