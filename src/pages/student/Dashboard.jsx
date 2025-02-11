import React, { useEffect, useState, useMemo } from "react";
import { username } from "../../constants";
import img from "../../assets/undraw_developer-activity_dn7p.svg";
import {
  AlertCircle,
  Book,
  CircleCheck,
  Clock,
  Code,
  Globe,
  GraduationCap,
} from "lucide-react";
import Loading from "../../components/ui/Loading";
import {
  getRegisteredCourses,
  getStudentQuiz,
} from "../../services/studentService";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const colors = useMemo(
    () => [
      "bg-orange-50",
      "bg-blue-50",
      "bg-green-50",
      "bg-pink-50",
      "bg-indigo-50",
    ],
    []
  );

  const iconColors = useMemo(
    () => [
      "text-yellow-600",
      "text-blue-600",
      "text-green-600",
      "text-red-600",
      "text-purple-600",
    ],
    []
  );

  const icons = useMemo(
    () => [
      <Book className="w-6 h-6" />,
      <Globe className="w-6 h-6" />,
      <Code className="w-6 h-6" />,
    ],
    []
  );

  const notifications = [
    {
      id: 1,
      message: "Your profile has been updated successfully.",
      date: "2024-02-11T10:30:00Z",
    },
  ];

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
      setQuizzes(quizReg.quizzes);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Generate an array of quiz dates
  const quizDates = useMemo(
    () => quizzes.map((quiz) => new Date(quiz.QuizDate)),
    [quizzes]
  );

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

        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
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
                  className={`p-6 rounded-lg shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer ${
                    colors[index % colors.length]
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full">
                      {React.cloneElement(icons[index % icons.length], {
                        className: `${iconColors[index % iconColors.length]}`,
                      })}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {course.course.CourseName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Code: {course.course.CourseCode}
                      </p>
                      <p className="text-sm text-gray-500">
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

        <div className="bg-white p-6 rounded-lg shadow-md mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/student/my-courses")}
              className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
            >
              <Book className="w-6 h-6 text-indigo-600 mx-auto" />
              <span className="text-sm text-gray-800 mt-2">View Courses</span>
            </button>
            <button
              onClick={() => navigate("/student/quizzes")}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300"
            >
              <Clock className="w-6 h-6 text-green-600 mx-auto" />
              <span className="text-sm text-gray-800 mt-2">Start Quiz</span>
            </button>
            <button
              onClick={() => navigate("/student/profile")}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300"
            >
              <CircleCheck className="w-6 h-6 text-blue-600 mx-auto" />
              <span className="text-sm text-gray-800 mt-2">Update Profile</span>
            </button>
            <button
              onClick={() => navigate("/student/quiz-results")}
              className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-300"
            >
              <GraduationCap className="w-6 h-6 text-yellow-600 mx-auto" />
              <span className="text-sm text-gray-800 mt-2">Results</span>
            </button>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white p-2 rounded-lg shadow-md grid grid-cols-1 gap-4">
          <DayPicker
            mode="single"
            className="border border-gray-300 rounded-lg p-2 md:p-4 bg-gray-50 sm:w-[21rem] lg:w-full h-full"
            classNames={{ today: "bg-indigo-600 text-white rounded-full" }}
            selected={quizDates} // Highlight quiz dates
            modifiers={{ quizDay: quizDates }}
            modifiersClassNames={{
              quizDay: "bg-indigo-100 text-primary rounded-full",
            }}
          />

          <div className="mt-6">
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
                      <div className="p-3 bg-indigo-50 rounded-full">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {quiz.Title}
                        </h4>
                        <p className="text-sm text-gray-700">
                          Course: {quiz.CourseName} ({quiz.CourseCode})
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
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Notifications
            </h3>
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm">
                <AlertCircle className="w-6 h-6 text-gray-400 mr-2" />
                <p className="text-gray-600">No new notifications.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center gap-2 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <div className="p-2 bg-indigo-50 rounded-full">
                      <AlertCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.date).toLocaleString()}
                      </p>
                    </div>
                    <button className="ml-auto text-sm text-indigo-600 hover:text-indigo-800">
                      <CircleCheck />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <a
              href="/notifications"
              className="block text-center text-sm text-indigo-600 hover:text-indigo-800 mt-[10px] hover:underline duration-300 transition-all"
            >
              View All Notifications
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
