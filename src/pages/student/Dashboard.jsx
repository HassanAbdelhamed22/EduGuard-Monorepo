import React, { useEffect, useState, useMemo } from "react";
import { username } from "../../constants";
import img from "../../assets/undraw_developer-activity_dn7p.svg";
import { AlertCircle, Book, Clock } from "lucide-react";
import Loading from "../../components/ui/Loading";
import {
  getRegisteredCourses,
  getStudentQuiz,
} from "../../services/studentService";
import { DayPicker } from "react-day-picker";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const colors = useMemo(
    () => [
      "bg-gradient-to-r from-yellow-600 to-orange-500",
      "bg-gradient-to-r from-blue-500 to-cyan-500",
      "bg-gradient-to-r from-teal-500 to-green-500",
      "bg-gradient-to-r from-pink-500 to-red-500",
      "bg-gradient-to-r from-indigo-500 to-purple-500",
    ],
    []
  );

  const iconColors = useMemo(
    () => [
      "text-yellow-500",
      "text-blue-500",
      "text-green-500",
      "text-red-500",
      "text-purple-500",
    ],
    []
  );

  // Function to get the nearest quizzes
  const nearestQuizzes = useMemo(() => {
    const now = new Date();
    return quizzes
      .filter((quiz) => new Date(quiz.QuizDate) > now) // Filter quizzes in the future
      .sort((a, b) => new Date(a.QuizDate) - new Date(b.QuizDate)) // Sort by date
      .slice(0, 2); // Get the first 2 quizzes
  }, [quizzes]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const courseReg = await getRegisteredCourses();
      setCourses(courseReg.data.registeredCourses);

      const quizReg = await getStudentQuiz();
      setQuizzes(Array.isArray(quizReg?.data) ? quizReg.data : []);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-2 md:p-6 min-h-screen grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div className="md:col-span-4">
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <img src={img} alt="Welcome student" className="w-1/2 md:w-1/3" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Welcome Back, {username}!
            </h2>
            <p className="mt-2 text-sm md:text-base">
              Check out your upcoming quizzes and registered courses.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            My Courses
          </h3>

          {courses.length === 0 ? (
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <AlertCircle className="w-6 h-6 text-gray-400 mr-2" />
              <p className="text-gray-600">No courses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <div
                  key={course.course.CourseID}
                  className={`p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
                    colors[index % colors.length]
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <Book
                        className={`w-6 h-6 ${
                          iconColors[index % iconColors.length]
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {course.course.CourseName}
                      </h4>
                      <p className="text-sm text-white/90">
                        Code: {course.course.CourseCode}
                      </p>
                      <p className="text-sm text-white/70">
                        Created At:{" "}
                        {new Date(
                          course.course.created_at
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white p-2 rounded-lg shadow-md grid grid-cols-1 gap-4">
          <DayPicker
            mode="single"
            className="border border-gray-300 rounded-lg p-2 md:p-4 bg-gray-50 sm:w-[21rem] lg:w-full h-full"
            classNames={{ today: "bg-indigo-600 text-white rounded-full" }}
          />

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Quizzes
            </h3>
            {nearestQuizzes.length === 0 ? (
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <AlertCircle className="w-6 h-6 text-gray-400 mr-2" />
                <p className="text-gray-600">No upcoming quizzes found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                {nearestQuizzes.map((quiz) => (
                  <div
                    key={quiz.QuizID}
                    className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <Clock className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {quiz.Title}
                        </h4>
                        <p className="text-sm text-gray-700">
                          Course: {quiz.CourseName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date: {quiz.QuizDate}
                        </p>
                        <div className="flex gap-4 text-[13px]">
                          <p className="text-gray-500">
                            From:{" "}
                            {new Date(quiz.StartTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-gray-500">
                            To:{" "}
                            {new Date(quiz.EndTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
