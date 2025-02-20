import React, { useEffect, useMemo, useState } from "react";
import { username } from "../../constants";
import img from "../../assets/undraw_questions_g2px.svg";
import { AlertCircle, Book, Clock } from "lucide-react";
import Loading from "./../../components/ui/Loading";
import {
  getAllQuizzes,
  getBestPerformers,
  viewRegisteredCourses,
} from "../../services/professorService";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/Table";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bestPerformers, setBestPerformers] = useState([]);

  // Memoize static data
  const colors = useMemo(
    () => [
      "bg-gradient-to-r from-pink-500 to-red-500",
      "bg-gradient-to-r from-indigo-500 to-purple-500",
      "bg-gradient-to-r from-teal-500 to-green-500",
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "bg-gradient-to-r from-blue-500 to-cyan-500",
    ],
    []
  );

  const iconColors = useMemo(
    () => [
      "text-red-500",
      "text-purple-500",
      "text-green-500",
      "text-yellow-500",
      "text-blue-500",
    ],
    []
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const courseRes = await viewRegisteredCourses();
      setCourses(courseRes.data);

      const quizRes = await getAllQuizzes();
      setQuizzes(quizRes.quizzes);

      const bestPerformersRes = await getBestPerformers();
      setBestPerformers(bestPerformersRes.best_performers);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Memoize derived data for the two nearest upcoming quizzes
  const nearestQuizzes = useMemo(() => {
    const now = new Date();
    return quizzes
      .filter((quiz) => new Date(quiz.QuizDate) > now)
      .sort((a, b) => new Date(a.QuizDate) - new Date(b.QuizDate))
      .slice(0, 2);
  }, [quizzes]);

  // Format date and time for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-2 md:p-6 min-h-screen grid grid-cols-1 lg:grid-cols-6 gap-4">
      {/* First Div (Takes 3 columns on desktop, full width on mobile) */}
      <div className="md:col-span-4">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <img
            src={img}
            alt="Questions Illustration"
            className="w-1/2 md:w-1/3"
            loading="lazy"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Welcome back, {username}!
            </h2>
            <p className="mt-2 text-sm md:text-base">
              Check out your upcoming quizzes and registered courses.
            </p>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Registered Courses
          </h3>
          {isLoading ? (
            <Loading />
          ) : courses.length === 0 ? (
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <AlertCircle className="w-6 h-6 text-gray-400 mr-2" />
              <p className="text-gray-600">No courses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <div
                  key={course.CourseID}
                  className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${
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
                        {course.CourseName}
                      </h4>
                      <p className="text-sm text-white/85">
                        Code: {course.CourseCode}
                      </p>
                      <p className="text-sm text-white/75">
                        {course.course_registrations.length} Students
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Best Performers Table */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Best Performers</h3>
          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Quizzes</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bestPerformers.length > 0 ? (
                bestPerformers.map((student) => (
                  <TableRow key={student.rank}>
                    <TableCell>{student.rank}</TableCell>
                    <TableCell>{student.student_name}</TableCell>
                    <TableCell>{student.courses}</TableCell>
                    <TableCell>{student.quizzes}</TableCell>
                    <TableCell>{student.points}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No best performers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Second Div (Takes 1 column on desktop, full width on mobile) */}
      <div className="md:col-span-2">
        <div className="bg-white p-2 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <DayPicker
            mode="single"
            className="border border-gray-300 rounded-lg p-2 md:p-4 bg-gray-50 sm:w-[21rem] lg:w-full h-full"
            classNames={{
              today: "bg-indigo-600 text-white rounded-full",
            }}
          />

          {/* Quizzes Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              Upcoming Quizzes
            </h3>

            {isLoading ? (
              <Loading />
            ) : nearestQuizzes.length === 0 ? (
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-gray-400 mr-2" />
                <p className="text-gray-600">No upcoming nearestQuizzes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {nearestQuizzes.map((quiz) => (
                  <div
                    key={quiz.QuizID}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Clock className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {quiz.Title}
                        </h4>
                        <p className="text-sm font-medium text-indigo-600 mt-1">
                          {quiz.CourseName} ({quiz.CourseCode})
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="font-medium">Date:</span>
                            <span className="ml-2">
                              {formatDate(quiz.QuizDate)}
                            </span>
                          </p>
                          <div className="flex items-center text-sm text-gray-600 gap-4">
                            <p className="flex items-center">
                              <span className="font-medium">Start:</span>
                              <span className="ml-2">
                                {formatTime(quiz.StartTime)}
                              </span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium">End:</span>
                              <span className="ml-2">
                                {formatTime(quiz.EndTime)}
                              </span>
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="font-medium">Duration:</span>
                            <span className="ml-2">
                              {quiz.Duration} minutes
                            </span>
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
