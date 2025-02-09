import React, { useCallback, useEffect, useState } from "react";
import { X, Edit2, Trash2, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import { useLocation, useParams } from "react-router-dom";
import {
  createQuestion,
  deleteQuestion,
  getQuizDetails,
  updateQuestion,
} from "../../services/professorService";
import toast from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import PaginationLogic from "../../components/PaginationLogic";
import Modal from "./../../components/ui/Modal";
import AddQuestionForm from "../../components/forms/AddQuestionForm";
import QuizInfo from "../../components/quiz view details/QuizInfo";
import EditQuestionForm from "../../components/quiz view details/EditQuestionForm";
import QuestionDisplay from "../../components/quiz view details/QuestionDisplay";

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
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const location = useLocation();
  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const fetchQuiz = useCallback(
    async (page) => {
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
    },
    [quizId]
  );

  useEffect(() => {
    fetchQuiz(pagination.current_page);
  }, [pagination.current_page, fetchQuiz]);

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

  const handleEdit = useCallback((question) => {
    setEditingQuestion(question.QuestionID);
    setEditedText(question.Content);
    setEditedOptions([...question.answers]);
    setCorrectAnswer(question.answers.findIndex((answer) => answer.IsCorrect));
    setEditedMarks(question.Marks);
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const correctAnswerText = editedOptions[correctAnswer].AnswerText;

      const updatedQuestion = {
        question_id: editingQuestion,
        content: editedText,
        marks: parseInt(editedMarks),
        type: quiz.questions.find((q) => q.QuestionID === editingQuestion).Type,
        options: editedOptions.map((option) => option.AnswerText),
        correct_option: correctAnswerText,
      };

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

  const handleAddQuestionSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const formData = new FormData();
      formData.append("quiz_id", values.quiz_id);
      formData.append("content", values.content);
      formData.append("type", values.type);
      formData.append("marks", values.marks);
      if (values.type === "mcq") {
        formData.append(
          "correct_option",
          values.options[values.correct_option]
        );
      } else {
        formData.append("correct_option", values.correct_option);
      }

      if (values.type === "mcq") {
        values.options.forEach((option) => {
          formData.append("options[]", option);
        });
      }

      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await createQuestion(formData);
      if (response.status === 201) {
        toast.success(response.data.message);
        resetForm();
        setIsAddQuestionModalOpen(false);
        await fetchQuiz(pagination.current_page);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error Response:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!quiz) return <p>Failed to load quiz.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <h2 className="text-xl font-semibold">Quiz Details</h2>
        <button
          onClick={() => setIsAddQuestionModalOpen(true)}
          className="p-2 bg-primary text-white rounded hover:bg-primaryHover flex items-center gap-1 duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Question</span>
        </button>
      </div>

      <div className="mb-4 pb-2 border-b flex justify-between items-center">
        <QuizInfo quiz={quiz} courseName={courseName} courseCode={courseCode}/>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((question) => (
          <div
            key={question.QuestionID}
            className="border rounded-lg p-4 flex justify-between items-start mb-3"
          >
            <div className="w-full">
              {editingQuestion === question.QuestionID ? (
                <EditQuestionForm
                  editedText={editedText}
                  setEditedText={setEditedText}
                  editedMarks={editedMarks}
                  setEditedMarks={setEditedMarks}
                  editedOptions={editedOptions}
                  setEditedOptions={setEditedOptions}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  handleSave={handleSave}
                  handleCancelEdit={handleCancelEdit}
                  isSaving={isSaving}
                />
              ) : (
                <QuestionDisplay question={question} />
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

      {/* Add Question Modal */}
      <Modal
        isOpen={isAddQuestionModalOpen}
        closeModal={() => setIsAddQuestionModalOpen(false)}
        title="Add Question"
        description="Please fill in the form below to add a new question."
      >
        <AddQuestionForm
          initialValues={{
            quiz_id: quizId,
            content: "",
            type: "mcq",
            marks: "",
            options: ["", ""],
            correct_option: "",
            image: null,
          }}
          onSubmit={handleAddQuestionSubmit}
          hideQuizSelect={true}
        />
      </Modal>
    </div>
  );
};

export default QuizViewDetails;
