import React from "react";
import { Card, CardContent } from "../ui/QuizCard";
import { Clock } from "lucide-react";

const QuizHeader = ({ quizDetails, timeFormatted, selectedAnswers, totalQuestions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{quizDetails?.Title}</h1>
            <p className="text-indigo-100">{quizDetails?.Description}</p>
          </div>
          {/* Timer Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white" />
                <div className="space-y-1">
                  <p className="text-sm text-white/80">Time Remaining</p>
                  <p className="text-2xl font-bold text-white font-mono">
                    {timeFormatted.minutes}:{timeFormatted.seconds}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quiz Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Course</p>
          <p className="font-medium text-gray-900">{quizDetails?.CourseName}</p>
          <p className="text-sm text-gray-600">{quizDetails?.CourseCode}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Total Marks</p>
          <p className="font-medium text-gray-900">
            {quizDetails?.TotalMarks} Points
          </p>
          <p className="text-sm text-gray-600">
            {Object.keys(selectedAnswers).length} of {totalQuestions} answered
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium text-gray-900">
            {quizDetails?.Duration} Minutes
          </p>
          <p className="text-sm text-gray-600">
            Started at {new Date(quizDetails?.StartTime).toLocaleTimeString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Due</p>
          <p className="font-medium text-gray-900">
            {new Date(quizDetails?.EndTime).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(quizDetails?.EndTime).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
