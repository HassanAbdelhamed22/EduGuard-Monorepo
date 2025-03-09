import { Clock } from "lucide-react";
import React from "react";
import { Progress } from "../ui/Progress";

const FloatingTimer = ({ timeFormatted, progressValue }) => {
  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-md z-50">
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-indigo-600" />
        <p className="text-lg font-bold text-gray-800">
          {timeFormatted.minutes}:{timeFormatted.seconds}
        </p>
      </div>
      <Progress value={progressValue} className="h-2 mt-2" />
    </div>
  );
};

export default FloatingTimer;
