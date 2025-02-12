import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQuizQuestions,
  startQuiz,
  submitQuiz,
} from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Button from "../../components/ui/Button";

const QuizInterface = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  // Fetch quiz questions and start the quiz
  useEffect(() => {
    const initializeQuiz = async () => {
      setIsLoading(true);
      try {
        const startResponse = await startQuiz(quizId);

        if (startResponse?.status === 200) {
          setQuizStarted(true);
          const questionResponse = await getQuizQuestions(quizId, 1);

          if (questionResponse?.questions) {
            setQuestions(questionResponse.questions);
            setTotalPages(questionResponse.pagination.last_page);
            setTimeLeft(startResponse.quiz.Duration * 60); // Convert minutes to seconds
          } else {
            throw new Error("No questions received from server");
          }
        } else {
          throw new Error(startResponse?.message || "Failed to start quiz");
        }
      } catch (error) {
        console.error("Quiz initialization failed:", error);
        toast.error(error.response?.data?.message || error.message);
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuiz();
  }, [quizId, navigate]);

  // Timer logic
  useEffect(() => {
    if (!quizStarted || timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          toast.error("Time's up!");
          handleSubmitQuiz();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  // Fetch questions for the current page
  const fetchQuestions = async (page) => {
    try {
      const response = await getQuizQuestions(quizId, page);
      if (response && response.questions) {
        setQuestions(response.questions);
        setCurrentPage(page);
      } else {
        toast.error("Failed to fetch questions.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Submit the quiz
  const handleSubmitQuiz = async () => {
    try {
      if (Object.keys(selectedAnswers).length === 0) {
        toast.error("Please answer at least one question before submitting");
        return;
      }

      const answers = Object.entries(selectedAnswers).map(
        ([questionId, answer]) => ({
          question_id: parseInt(questionId),
          answer: answer,
        })
      );

      const response = await submitQuiz(quizId, answers);

      if (response?.status === 200) {
        toast.success(response.message || "Quiz submitted successfully!");
        navigate("/student/quizzes");
      } else {
        throw new Error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Quiz submission failed:", error);
      toast.error(error.response?.data?.message || "Failed to submit quiz");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      {/* Timer */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Quiz</h2>
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-md">
          <Clock className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-700">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => fetchQuestions(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => fetchQuestions(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2"
        >
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Current Question */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {questions.map((question) => (
          <div key={question.QuestionID} className="space-y-4">
            {question.image && (
              <img
                src={`http://127.0.0.1:8000/storage/${question.image}`}
                alt={question.Content}
                className="w-1/2 rounded-lg mb-3"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800">
              {question.Content}
            </h2>
            <div className="space-y-2">
              {question.answers.map((answer) => (
                <div
                  key={answer.AnswerID}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedAnswers[question.QuestionID] === answer.AnswerText
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    handleAnswerSelect(question.QuestionID, answer.AnswerText)
                  }
                >
                  <input
                    type="radio"
                    name={`question-${question.QuestionID}`}
                    checked={
                      selectedAnswers[question.QuestionID] === answer.AnswerText
                    }
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{answer.AnswerText}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSubmitQuiz}
          variant="default"
          className="flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" /> Submit Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizInterface;
