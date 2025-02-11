import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import {
  getRegisteredCourses,
  viewCourseMaterials,
} from "../../services/studentService";
import Button from "../../components/ui/Button";
import { FileText, NotebookPen, Video } from "lucide-react";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [materialsCount, setMaterialsCount] = useState({});
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await getRegisteredCourses();
      setCourses(data.registeredCourses);

      const materialPromises = data.registeredCourses.map((course) =>
        viewCourseMaterials(course.CourseID)
      );

      // Fetch all data in parallel
      const materialsArray = await Promise.all(materialPromises);

      // Process materials and quizzes counts
      const newMaterialsCount = {};

      data.registeredCourses.forEach((course, index) => {
        const materials = materialsArray[index]?.data.courseMaterials || [];

        newMaterialsCount[course.CourseID] = {
          pdf: materials.filter((m) => m.MaterialType === "pdf").length,
          video: materials.filter((m) => m.MaterialType === "video").length,
          notes: materials.filter((m) => m.MaterialType === "text").length,
          total: materials.length,
        };
      });

      // Update state only once
      setMaterialsCount(newMaterialsCount);
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

          return (
            <div
              key={course.CourseID}
              className="p-6 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white "
            >
              {/* Course Code and Students Count */}
              <div className="flex flex-wrap items-center justify-between mb-1">
                <h3 className="text-xl font-bold text-indigo-500 hover:text-indigo-600 duration-300 ">
                  {course.course.CourseCode}
                </h3>
              </div>

              {/* Course Name */}
              <p className="mb-4 text-lg font-medium text-gray-700">
                {course.course.CourseName}
              </p>

              {/* Created and Last Updated Dates */}
              <div className="mb-4 text-sm text-gray-500">
                <p>
                  Created:{" "}
                  {new Date(course.course.created_at).toLocaleDateString()}
                </p>
                <p>
                  Last Updated:{" "}
                  {new Date(course.course.updated_at).toLocaleDateString()}
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
                </div>
              </div>

              {/* Buttons */}
              <Button
                variant={"default"}
                disabled={materials.total === 0}
                fullWidth
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

export default MyCourses;
