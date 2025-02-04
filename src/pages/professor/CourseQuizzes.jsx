import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { viewCourseQuizzes } from "../../services/professorService";
import Loading from "../../components/ui/Loading";
import { FileQuestion } from "lucide-react";
import Button from "../../components/ui/Button";

const CourseQuizzes = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

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
      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes available for this course.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.QuizID}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer"
              onClick={() => {
                navigate(`/professor/quiz/${quiz.QuizID}`);
              }}
              title="View Quiz Details"
            >
              <div className="flex items-center gap-4">
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
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="cancel"
                  onClick={() => {
                    console.log("Edit Quiz");
                  }}
                  fullWidth
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => {
                    console.log("Delete Quiz");
                  }}
                  fullWidth
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseQuizzes;
