import { useState, useEffect } from "react";
import { getAllQuizzes } from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";
import { Search, FileQuestion, Filter } from "lucide-react";

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

  return (
    <div className="p-6">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Course Name or Quiz Title"
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

      {/* Quiz Cards */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.QuizID}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer flex flex-col justify-between h-full"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50  rounded-full">
                  <FileQuestion className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 ">
                    {quiz.Title}
                  </h2>
                  <p className="text-sm text-gray-500 font-medium">{quiz.CourseName} ({quiz.CourseCode})</p>
                  <p className="text-sm text-gray-600 ">{quiz.Description}</p>
                  <div className="mt-2 text-sm text-gray-500 ">
                    <p>
                      Date:{" "}
                      <span className="font-medium">
                        {new Date(quiz.QuizDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                    <div className="flex gap-4">
                      <p>
                        Start:{" "}
                        <span className="font-medium">
                          {new Date(quiz.StartTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </p>
                      <p>
                        End:{" "}
                        <span className="font-medium">
                          {new Date(quiz.EndTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </p>
                    </div>
                    <p>
                      Duration:{" "}
                      <span className="font-medium">
                        {quiz.Duration} minutes
                      </span>
                    </p>
                    <p>
                      Total Marks:{" "}
                      <span className="font-medium">
                        {quiz.TotalMarks} marks
                      </span>
                    </p>
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
