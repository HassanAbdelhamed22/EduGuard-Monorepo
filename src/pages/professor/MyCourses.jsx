import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import {
  viewCourseMaterials,
  viewCourseQuizzes,
  viewRegisteredCourses,
} from "../../services/professorService";
import Loading from "./../../components/ui/Loading";
import { FileQuestion, FileText, NotebookPen, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [materialsCount, setMaterialsCount] = useState({});
  const [quizzesCount, setQuizzesCount] = useState({});
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await viewRegisteredCourses();
      setCourses(data);

      const materialPromises = data.map((course) =>
        viewCourseMaterials(course.CourseID)
      );
      const quizPromises = data.map((course) =>
        viewCourseQuizzes(course.CourseID)
      );

      // Fetch all data in parallel
      const materialsArray = await Promise.all(materialPromises);
      const quizzesArray = await Promise.all(quizPromises);

      // Process materials and quizzes counts
      const newMaterialsCount = {};
      const newQuizzesCount = {};

      data.forEach((course, index) => {
        const materials = materialsArray[index] || [];
        const quizzes = quizzesArray[index] || [];

        newMaterialsCount[course.CourseID] = {
          pdf: materials.filter((m) => m.MaterialType === "pdf").length,
          video: materials.filter((m) => m.MaterialType === "video").length,
          notes: materials.filter((m) => m.MaterialType === "text").length,
          total: materials.length,
        };
        newQuizzesCount[course.CourseID] = quizzes.length;
      });

      // Update state only once
      setMaterialsCount(newMaterialsCount);
      setQuizzesCount(newQuizzesCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-wrap items-center gap-4">
        {courses.map((course) => {
          const materials = materialsCount[course.CourseID] || {
            pdf: 0,
            video: 0,
            notes: 0,
            total: 0,
          };
          const quizzes = quizzesCount[course.CourseID] || 0;

          return (
            <div
              key={course.CourseID}
              className="p-6 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white cursor-pointer"
              onClick={() =>
                navigate(`/professor/course/${course.CourseID}/students`, {
                  state: {
                    courseName: course.CourseName,
                    courseCode: course.CourseCode,
                  },
                })
              }
              title="Click to view students"
            >
              {/* Course Code and Students Count */}
              <div className="flex flex-wrap items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {course.CourseCode}
                </h3>
                <span className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full">
                  {course.course_registrations?.length > 0
                    ? `${course.course_registrations.length} students`
                    : "No students yet"}
                </span>
              </div>

              {/* Course Name */}
              <p className="mb-4 text-lg font-medium text-gray-700">
                {course.CourseName}
              </p>

              {/* Created and Last Updated Dates */}
              <div className="mb-4 text-sm text-gray-500">
                <p>
                  Created: {new Date(course.created_at).toLocaleDateString()}
                </p>
                <p>
                  Last Updated:{" "}
                  {new Date(course.updated_at).toLocaleDateString()}
                </p>
              </div>

              {/* Materials and Quizzes Count */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-4 text-gray-700">
                  <MaterialIcon
                    icon={FileText}
                    count={materials.pdf}
                    label="PDFs"
                    color="text-red-500"
                  />
                  <MaterialIcon
                    icon={Video}
                    count={materials.video}
                    label="Videos"
                    color="text-blue-500"
                  />
                  <MaterialIcon
                    icon={NotebookPen}
                    count={materials.notes}
                    label="Notes"
                    color="text-yellow-500"
                  />
                  <MaterialIcon
                    icon={FileQuestion}
                    count={quizzes}
                    label="Quizzes"
                    color="text-purple-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant={"default"}
                  disabled={quizzes === 0}
                  className="flex-1"
                  onClick={() =>
                    navigate(`/professor/quizzes/${course.CourseID}`, {
                      state: {
                        courseName: course.CourseName,
                        courseCode: course.CourseCode,
                      },
                    })
                  }
                >
                  View Quizzes
                </Button>
                <Button
                  variant={"outline"}
                  disabled={materials.total === 0}
                  className="flex-1"
                  onClick={() =>
                    navigate(`/professor/materials/${course.CourseID}`, {
                      state: {
                        courseName: course.CourseName,
                        courseCode: course.CourseCode,
                      },
                    })
                  }
                >
                  View Materials
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Memoized Component for Material Icons
const MaterialIcon = React.memo(({ icon: Icon, count, label, color }) => (
  <div className="flex items-center gap-1">
    <Icon className={`w-5 h-5 ${color}`} />
    <span>
      {count} {label}
    </span>
  </div>
));

export default CourseList;
