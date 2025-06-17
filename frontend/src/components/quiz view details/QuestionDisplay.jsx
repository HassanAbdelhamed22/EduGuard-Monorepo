import React from "react";

const QuestionDisplay = ({ question }) => {
  return (
    <>
      {question.image && (
        <img
          src={`http://127.0.0.1:8000/storage/${question.image}`}
          alt={question.Content}
          className="w-1/2 rounded-lg mb-3"
        />
      )}
      <div className="font-medium border-b pb-2 mb-2 flex items-center gap-5">
        <p>{question.Content}</p>
        <p className="text-sm text-mediumGray w-1/6">
          ({question.Marks} marks)
        </p>
      </div>
      <ul className="list-decimal md:list-inside m-2">
        {question.answers.map((option) => (
          <li
            key={option.AnswerID}
            className={`m-2 p-2 border rounded w-full ${
              option.IsCorrect === 1 ? "border-green-500 bg-green-100" : ""
            }`}
          >
            {option.AnswerText}
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuestionDisplay;
