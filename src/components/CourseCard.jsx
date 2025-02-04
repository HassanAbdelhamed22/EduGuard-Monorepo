import React from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";


const CourseCard = ({ course }) => {
  const { courseCode, courseName, numberOfStudents, tags } = course;

  return (
    <Card hoverEffect className="w-full sm:w-80 max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-primary cursor-pointer duration-300">
          {courseCode}
        </h3>
        <span className="text-sm text-gray-900 bg-indigo-100 px-2 py-1 rounded-full">
          {numberOfStudents} students
        </span>
      </div>

      {/* Body */}
      <div className="mt-4 space-y-2">
        <h4 className="text-lg font-medium text-gray-900">{courseName}</h4>

        {/* Optional: Tags (if applicable) */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <Button>View Quizzes</Button>
        <Button variant="outline">View Materials</Button>
      </div>
    </Card>
  );
};

export default CourseCard;
