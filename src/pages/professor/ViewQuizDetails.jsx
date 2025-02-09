import React, { useCallback, useEffect, useState } from "react";
import { X, Edit2, Trash2, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteQuestion,
  getQuizDetails,
  updateQuestion,
} from "../../services/professorService";
import toast from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import PaginationLogic from "../../components/PaginationLogic";

const QuizViewDetails = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedOptions, setEditedOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [editedMarks, setEditedMarks] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const fetchQuiz = async (page) => {
    try {
      const { quiz, pagination } = await getQuizDetails(quizId, page);

      setQuiz(quiz);
      setPagination({
        ...pagination,
        current_page: page,
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz(pagination.current_page);
  }, [quizId]);

  const handlePageChange = useCallback(
    (page) => {
      if (
        page !== pagination.current_page &&
        page > 0 &&
        page <= pagination.total_pages
      ) {
        fetchQuiz(page);
      }
    },
    [pagination, fetchQuiz]
  );

  const handleEdit = (question) => {
    setEditingQuestion(question.QuestionID);
    setEditedText(question.Content);
    setEditedOptions([...question.answers]);
    setCorrectAnswer(question.answers.findIndex((answer) => answer.IsCorrect));
    setEditedMarks(question.Marks);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const correctAnswerText = editedOptions[correctAnswer].AnswerText;
      
      const updatedQuestion = {
        question_id: editingQuestion,
        content: editedText,
        marks: parseInt(editedMarks),
        type: quiz.questions.find((q) => q.QuestionID === editingQuestion).Type,
        options: editedOptions.map((option) => option.AnswerText), // Array of answer texts
        correct_option: correctAnswerText, // The text of the correct answer
      };
      
      console.log("Attempting to update with:", updatedQuestion);
      await updateQuestion(editingQuestion, updatedQuestion);
      toast.success("Question updated successfully");
      setEditingQuestion(null);
      await fetchQuiz(pagination.current_page);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      toast.success("Question deleted successfully");
      fetchQuiz(pagination.current_page);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (loading) return <Loading />;
  if (!quiz) return <p>Failed to load quiz.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <h2 className="text-xl font-semibold">Quiz Details</h2>
        <button
          onClick={() => navigate("/professor/quizzes/add-questions")}
          className="p-2 bg-primary text-white rounded hover:bg-primaryHover flex items-center gap-1 duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Question</span>
        </button>
      </div>
      <div className="mb-4 pb-2 border-b flex justify-between items-center">
        <div className="space-y-2 mb-6">
          <div className="flex">
            <span className="font-medium w-32">Course:</span>
            <span>
              {courseName} - {courseCode}
            </span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Title:</span>
            <span>{quiz.Title}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Description:</span>
            <span>{quiz.Description}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Date:</span>
            <span>{quiz.QuizDate}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Start Time:</span>
            <span>
              {new Date(quiz.StartTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">End Time:</span>
            <span>
              {new Date(quiz.EndTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Duration:</span>
            <span>{quiz.Duration} minutes</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {quiz.questions.map((question) => (
          <div
            key={question.QuestionID}
            className="border rounded-lg p-4 flex justify-between items-start mb-3"
          >
            <div className="w-full">
              {editingQuestion === question.QuestionID ? (
                <div>
                  {/* Question Content */}
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />

                  {/* Marks */}
                  <input
                    type="number"
                    className="w-full p-2 border rounded mb-2"
                    value={editedMarks}
                    onChange={(e) => setEditedMarks(e.target.value)}
                    placeholder="Enter marks"
                  />

                  {/* Options */}
                  {editedOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded mb-1"
                        value={option.AnswerText}
                        onChange={(e) => {
                          const newOptions = [...editedOptions];
                          newOptions[index].AnswerText = e.target.value;
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
                    <Button
                      onClick={handleCancelEdit}
                      variant={"cancel"}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave} variant={"default"} fullWidth isLoading={isSaving}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {question.image && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${question.image}`}
                      alt={question.Content}
                      className="w-full rounded-lg mb-3"
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
                          option.IsCorrect === 1
                            ? "border-green-500 bg-green-100"
                            : ""
                        }`}
                      >
                        {option.AnswerText}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            {editingQuestion !== question.QuestionID && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(question)}
                  className="p-2 hover:bg-indigo-50 rounded duration-300"
                >
                  <Edit2 className="w-4 h-4 text-primary" />
                </button>
                <button
                  onClick={() => handleDelete(question.QuestionID)}
                  className="p-2 hover:bg-red-50 rounded duration-300"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
      {/* <Button
        type="submit"
        fullWidth
        className={"my-5 mx-auto"}
        variant="default"
      >
        Save
      </Button> */}
    </div>
  );
};

export default QuizViewDetails;
