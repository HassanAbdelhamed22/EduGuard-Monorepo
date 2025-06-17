import React from "react";
import { Progress } from "../ui/Progress";

const QuizProgress = ({ progressValue }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Overall Progress</span>
        <span>{Math.round(progressValue)}% Complete</span>
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );
};

export default QuizProgress;
