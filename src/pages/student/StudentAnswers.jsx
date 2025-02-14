import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getStudentAnswers } from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import QuizInfo from "../../components/quiz view details/QuizInfo";

const StudentAnswers = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const location = useLocation();
  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

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
      const response = await getStudentAnswers(quizId, page);
      setQuiz(response.quiz);
      setPagination({ ...response.pagination, current_page: page });
    } catch (error) {
      console.error("Error fetching student answers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentAnswers(pagination.current_page);
  }, [quizId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold pb-4">Quiz Details</h2>

      <div className="mb-6 border-t border-gray-200 space-y-2 pt-4 border-b pb-6">
        <div className="flex">
          <span className="font-medium w-32">Course:</span>
          <span>{`${courseName} - ${courseCode}`}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Title:</span>
          <span>{quiz?.Title}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Description:</span>
          <span>{quiz?.Description}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Date:</span>
          <span>{quiz?.QuizDate}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Start Time:</span>
          <span>
            {new Date(quiz?.StartTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">End Time:</span>
          <span>
            {new Date(quiz?.EndTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Duration:</span>
          <span>{quiz?.Duration} minutes</span>
        </div>
        <div className="flex">
          <span className="font-medium w-32">Total Marks:</span>
          <span>{quiz?.TotalMarks} marks</span>
        </div>
      </div>
    </div>
  );
};

export default StudentAnswers;
