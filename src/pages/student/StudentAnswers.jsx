import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getStudentAnswers as getStudentAnswersStudent } from "../../services/studentService";
import { getStudentAnswers as getStudentAnswersProfessor } from "../../services/professorService";
import Loading from "../../components/ui/Loading";
import QuizInfo from "../../components/quiz view details/QuizInfo";
import PaginationLogic from "../../components/PaginationLogic";
import { CheckCircle2, XCircle } from "lucide-react";

const StudentAnswers = ({ studentId = null }) => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    per_page: 5,
  });
  const location = useLocation();
  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const isProfessorView = !!studentId;

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchStudentAnswers(page);
    }
  };

  const fetchStudentAnswers = async (page) => {
    try {
      setIsLoading(true);
      const getStudentAnswers = isProfessorView
        ? getStudentAnswersProfessor
        : getStudentAnswersStudent;
      const response = isProfessorView
        ? await getStudentAnswers(quizId, page, studentId)
        : await getStudentAnswers(quizId, page);
      setQuiz(response.quiz);
      setQuestions(response.questions || []);
      setPagination({ ...response.pagination, current_page: page });
    } catch (error) {
      console.error("Error fetching student answers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      (isProfessorView && studentId && quizId) ||
      (!isProfessorView && quizId)
    ) {
      fetchStudentAnswers(pagination.current_page);
    }
  }, [quizId, studentId, isProfessorView]);

  // Calculate the starting question number based on pagination
  const getQuestionNumber = (index) => {
    const itemsPerPage = pagination.per_page; // Adjust this based on your API's pagination
    return (pagination.current_page - 1) * itemsPerPage + index + 1;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-indigo-50 to-white p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          Quiz Details
        </h2>
        <p className="text-indigo-600">{`${courseName} - ${courseCode}`}</p>
      </div>

      <div className="mb-8 bg-gray-50 rounded-lg p-6 space-y-3 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Title</span>
            <span className="font-medium">{quiz?.Title || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Description</span>
            <span className="font-medium">{quiz?.Description || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Date</span>
            <span className="font-medium">{quiz?.QuizDate || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Duration</span>
            <span className="font-medium">
              {quiz?.Duration ? `${quiz.Duration} minutes` : "N/A"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Start Time</span>
            <span className="font-medium">
              {quiz?.StartTime
                ? new Date(quiz.StartTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">End Time</span>
            <span className="font-medium">
              {quiz?.EndTime
                ? new Date(quiz.EndTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="pt-4 border-t">
          <span className="text-sm text-gray-500">Total Marks:</span>
          <span className="font-bold text-base ml-2 text-indigo-600">
            {quiz?.TotalMarks ? `${quiz.TotalMarks} marks` : "N/A"}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question, index) => (
            <div
              key={question.question_id}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-lg font-bold">
                  Q{getQuestionNumber(index)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-lg text-gray-900 max-w-lg">
                      {question.question_text}
                    </h3>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                      {question.marks} marks
                    </span>
                  </div>
                  {question.image && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${question.image}`}
                      alt={question.question_text}
                      className="rounded-lg mb-4 max-w-md"
                    />
                  )}
                </div>
              </div>

              <div className="ml-14 space-y-3">
                {question.answers.map((answer) => (
                  <div
                    key={answer.answer_id}
                    className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                      answer.is_student_choice
                        ? answer.is_correct
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : answer.is_correct
                        ? "border-green-500 bg-green-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex-grow">
                      <p
                        className={`${
                          answer.is_student_choice ? "font-medium" : ""
                        }`}
                      >
                        {answer.answer_text}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {answer.is_student_choice && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {isProfessorView ? "Student answer" : "Your answer"}
                        </span>
                      )}
                      {answer.is_correct && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm">Correct</span>
                        </span>
                      )}
                      {answer.is_student_choice && !answer.is_correct && (
                        <span className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-5 h-5" />
                          <span className="text-sm">Incorrect</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {isProfessorView
              ? "No answers submitted by this student."
              : "You have not submitted any answers for this quiz."}
          </p>
        )}
      </div>

      <div className="mt-6">
        <PaginationLogic
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default StudentAnswers;
