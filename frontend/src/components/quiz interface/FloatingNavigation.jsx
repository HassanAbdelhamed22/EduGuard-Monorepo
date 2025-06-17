import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const FloatingNavigation = ({ currentPage, totalPages, fetchQuestions }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white  p-4 rounded-lg shadow-md flex gap-4 z-50">
      <button
        onClick={() => fetchQuestions(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-indigo-600 hover:bg-indigo-50"
        }`}
      >
        <ArrowLeft className="w-4 h-4" /> Previous
      </button>
      <span className="px-4 py-2 bg-gray-100  rounded-md text-sm font-medium">
        Question {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => fetchQuestions(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-indigo-600 hover:bg-indigo-50"
        }`}
      >
        Next <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FloatingNavigation;
