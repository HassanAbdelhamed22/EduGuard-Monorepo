import React from "react";
import { Card, CardContent } from "../ui/QuizCard";
import { CheckCircle } from "lucide-react";

const QuestionCard = ({
  question,
  currentPage,
  handleAnswerSelect,
  selectedAnswers,
}) => {
  return (
    <Card key={question.QuestionID} className="overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {question.image && (
          <div className="flex justify-center my-4">
            <img
              src={`http://127.0.0.1:8000/storage/${question.image}`}
              alt={question.Content}
              className="max-w-full h-auto rounded-lg shadow-md object-contain"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}
        {/* Question Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold">
              Q{currentPage}
            </span>
            {question.Content}
          </h2>
          {/* Answers */}
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <div
                key={answer.AnswerID}
                onClick={() =>
                  handleAnswerSelect(question.QuestionID, answer.AnswerText)
                }
                className={`relative flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedAnswers[question.QuestionID] === answer.AnswerText
                    ? "bg-indigo-50 border-2 border-indigo-500"
                    : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[question.QuestionID] === answer.AnswerText
                      ? "border-indigo-500 bg-indigo-500"
                      : "border-gray-400"
                  }`}
                >
                  {selectedAnswers[question.QuestionID] ===
                    answer.AnswerText && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-gray-700 font-medium">
                  {answer.AnswerText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
