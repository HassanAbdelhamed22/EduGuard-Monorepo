import React, { useEffect, useMemo, useState } from "react";
import { username } from "../../constants";
import img from "../../assets/undraw_questions_g2px.svg";
import { AlertCircle, Book, Clock } from "lucide-react";
import Loading from "./../../components/ui/Loading";
import {
  getAllQuizzes,
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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Memoize derived data (if needed)
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => new Date(quiz.QuizDate) > new Date());
  }, [quizzes]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6 min-h-screen grid grid-cols-1 md:grid-cols-6 gap-4">
      {/* First Div (Takes 3 columns on desktop, full width on mobile) */}
      <div className="md:col-span-4">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <img
            src={img}
            alt="Questions Illustration"
            className="w-1/2 md:w-1/3"
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
              {/* Sample Data */}
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Floyd Miles</TableCell>
                <TableCell>5</TableCell>
                <TableCell>30</TableCell>
                <TableCell>94</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Courtney Henry</TableCell>
                <TableCell>4</TableCell>
                <TableCell>30</TableCell>
                <TableCell>90</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Second Div (Takes 1 column on desktop, full width on mobile) */}
      <div className="md:col-span-2">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <DayPicker
            mode="single"
            className="border border-gray-300 rounded-lg p-4 bg-gray-50"
            classNames={{
              today: "bg-indigo-600 text-white rounded-full",
            }}
          />

          {/* Quizzes Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Quizzes
            </h3>
            {isLoading ? (
              <Loading />
            ) : filteredQuizzes.length === 0 ? (
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <AlertCircle className="w-6 h-6 text-gray-400 mr-2" />
                <p className="text-gray-600">No quizzes found.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {quizzes?.map((quiz) => (
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
                          <p className=" text-gray-500">
                            From:{" "}
                            {new Date(quiz.StartTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className=" text-gray-500">
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
