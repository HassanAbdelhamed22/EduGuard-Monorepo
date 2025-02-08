import React, { useEffect, useState } from "react";
import { X, Edit2, Trash2, Plus } from "lucide-react";
import Button from "../../components/ui/Button";

const QuizViewDetails = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedOptions, setEditedOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    const staticQuiz = {
      Title: "CS Quiz",
      Description: "This is a sample quiz for demonstration purposes.",
      Duration: 30,
      StartTime: "2023-10-01T09:00:00",
      EndTime: "2023-10-01T10:00:00",
      CourseID: 101,
      questions: [
        {
          id: 1,
          text: "What is your name?",
          options: ["Omar", "Hassan", "Youssef", "Ahmed"],
          correct: 0,
        },
        {
          id: 2,
          text: "What is your department?",
          options: ["CS", "IS", "AI", "IT"],
          correct: 1,
        },
      ],
    };

    setQuiz(staticQuiz);
    setLoading(false);
  }, []);

  const handleAddQuestion = () => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz) return prevQuiz;

      const newQuestion = {
        id: prevQuiz.questions.length + 1,
        text: "Enter The Question?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 0,
      };

      return { ...prevQuiz, questions: [...prevQuiz.questions, newQuestion] };
    });

    setTimeout(() => {
      setEditingQuestion(quiz?.questions.length + 1);
      setEditedText("Enter The Question?");
      setEditedOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
      setCorrectAnswer(0);
    }, 0);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question.id);
    setEditedText(question.text);
    setEditedOptions([...question.options]);
    setCorrectAnswer(question.correct);
  };

  const handleSave = () => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = prevQuiz.questions.map((q) =>
        q.id === editingQuestion
          ? {
              ...q,
              text: editedText,
              options: editedOptions,
              correct: correctAnswer,
            }
          : q
      );
      return { ...prevQuiz, questions: updatedQuestions };
    });
    setEditingQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleDelete = (id) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = prevQuiz.questions.filter((q) => q.id !== id);
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Failed to load quiz.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <h2 className="text-xl font-semibold">Quiz Details</h2>
        <button
          onClick={handleAddQuestion}
          className="p-2 bg-primary text-white rounded hover:bg-primaryHover flex items-center gap-1 duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Question</span>
        </button>
      </div>
      <div className="mb-4 pb-2 border-b flex justify-between items-center">
        <div className="space-y-2 mb-6">
          <div className="flex">
            <span className="font-medium w-32">Title:</span>
            <span>{quiz.Title}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Description:</span>
            <span>{quiz.Description}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Duration:</span>
            <span>{quiz.Duration} minutes</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Start Time:</span>
            <span>{quiz.StartTime}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">End Time:</span>
            <span>{quiz.EndTime}</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {quiz.questions.map((question) => (
          <div
            key={question.id}
            className="border rounded-lg p-4 flex justify-between items-start mb-3"
          >
            <div className="w-full">
              {editingQuestion === question.id ? (
                <div>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  {editedOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded mb-1"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...editedOptions];
                          newOptions[index] = e.target.value;
                          setEditedOptions(newOptions);
                        }}
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctAnswer === index}
                        onChange={() => setCorrectAnswer(index)}
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 bg-gray-400 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="p-2  bg-green-600 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-medium border-b pb-2 mb-2">
                    {question.text}
                  </p>
                  <ul className="list-decimal md:list-inside m-2">
                    {question.options.map((option, index) => (
                      <li
                        key={index}
                        className={`m-2 p-2 border rounded w-full ${
                          index === question.correct
                            ? "border-green-500 bg-green-100"
                            : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            {editingQuestion !== question.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(question)}
                  className="p-2 hover:bg-blue-100 rounded"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="p-2 hover:bg-red-100 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        fullWidth
        className={"my-5 mx-auto"}
        variant="default"
      >
        Save
      </Button>
    </div>
  );
};

export default QuizViewDetails;
