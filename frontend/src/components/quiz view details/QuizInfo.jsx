import React from "react";

const QuizInfo = ({ quiz, courseName, courseCode }) => {
  return (
    <div className="space-y-2 mb-6">
      {[
        { label: "Course", value: `${courseName} - ${courseCode}` },
        { label: "Title", value: quiz.Title },
        { label: "Description", value: quiz.Description },
        { label: "Date", value: quiz.QuizDate },
        {
          label: "Start Time",
          value: new Date(quiz.StartTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        {
          label: "End Time",
          value: new Date(quiz.EndTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        { label: "Duration", value: `${quiz.Duration} minutes` },
        { label: "Total Marks", value: `${quiz.TotalMarks} marks` },
      ].map(({ label, value }) => (
        <div key={label} className="flex">
          <span className="font-medium w-32">{label}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default QuizInfo;
