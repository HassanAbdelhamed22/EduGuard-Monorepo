import React, { useEffect, useState } from "react";
import { getSubmittedQuizzes } from "../../services/studentService";
import { FileQuestion } from "lucide-react";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";

const QuizzesResults = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });

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
      const response = await getSubmittedQuizzes(page);
      setQuizDetails(response.data);
      setPagination({ ...response.pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails(pagination.current_page);
  }, []);

  if (isLoading) {
    <Loading />;
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
                <Button variant="default" fullWidth>
                  Show Result
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizzesResults;
