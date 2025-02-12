import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizQuestions, startQuiz } from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Button from "../../components/ui/Button";

const QuizInterface = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  //** Fetch quiz questions and start the quiz
  useEffect(() => {
    const initializeQuiz = async () => {
      setIsLoading(true);
      try {
        const startResponse = await startQuiz(quizId);

        if (startResponse.status === 200) {
          setQuizStarted(true);
          const questionResponse = await getQuizQuestions(quizId, 1);
          setQuestions(questionResponse.questions);
          setTotalPages(questionResponse.pagination.totalPages);
          setTimeLeft(startResponse.quiz.Duration * 60);
        } else {
          toast.error(startResponse.message);
          navigate(-1);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuiz();
  }, [quizId, navigate]);

  //** Timer Logic */
  useEffect(() => {
    if (!quizStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  //* Handle time running out
  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Time's up!");
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  //* Fetch Questions for the current page
  const fetchQuestions = async (page) => {
    try {
      const response = await getQuizQuestions(quizId, page);
      setQuestions(response.questions);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  //** Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  //** Submit the quiz
  const handleSubmitQuiz = async () => {
    try {
      const answers = Object.entries(selectedAnswers).map(
        ([questionId, answer]) => ({
          question_id: parseInt(questionId),
          answer: answer,
        })
      );

      const response = await startQuiz(quizId, { answers });

      if (response.status === 200) {
        toast.success("Quiz submitted successfully!");
        navigate("/student/quizzes");
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Timer */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
        <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-md">
          <Clock className="w-6 h-6 text-gray-600" />
          <span className="text-lg font-semibold text-gray-700">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => fetchQuestions(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => fetchQuestions(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Current Question */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {questions.map((question) => (
          <div key={question.QuestionID}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {question.Content}
            </h2>
            <div className="space-y-3">
              {question.answers.map((answer) => (
                <div
                  key={answer.AnswerID}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
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
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">{answer.AnswerText}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSubmitQuiz} variant="primary">
          Submit Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizInterface;
