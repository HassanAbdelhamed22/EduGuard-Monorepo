import { useState, useEffect } from "react";
import { getAllQuizzes } from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";
import { Search, FileQuestion } from "lucide-react";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStatus, setQuizStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("nearest");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const quizReg = await getAllQuizzes();
      setQuizzes(quizReg.quizzes);

      const initialStatus = quizReg.quizzes.reduce((acc, quiz) => {
        acc[quiz.QuizID] = true;
        return acc;
      }, {});
      setQuizStatus(initialStatus);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkStartTime = () => {
      const now = new Date();
      const updatedStatus = { ...quizStatus };

      quizzes.forEach((quiz) => {
        const startTime = new Date(quiz.StartTime);
        if (now >= startTime) {
          updatedStatus[quiz.QuizID] = false;
        }
      });

      setQuizStatus(updatedStatus);
    };

    checkStartTime();
    const interval = setInterval(checkStartTime, 1000);
    return () => clearInterval(interval);
  }, [quizzes]);

  const filteredQuizzes = quizzes
    .filter(
      (quiz) =>
        quiz.CourseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.Title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.StartTime);
      const dateB = new Date(b.StartTime);
      return sortOrder === "nearest" ? dateA - dateB : dateB - dateA;
    });

  if (isLoading) {
    return <Loading />;
  }

  const filteredQuizzes = quizzes
    .filter((quiz) =>
      quiz.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.StartTime) - new Date(b.StartTime));

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6 relative w-1/2 mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by Course Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-[1px] border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg"
        />
      </div>
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.QuizID}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer"
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
                    <p>Total Marks: {quiz.TotalMarks} marks</p>
                  </div>
                </div>
              </div>

              <Button
                variant={"default"}
                fullWidth
                disabled={quizStatus[quiz.QuizID]}
                className="mt-4"
              >
                Start Quiz
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No quizzes found.</p>
      )}
    </div>
  );
};

export default MyQuizzes;
