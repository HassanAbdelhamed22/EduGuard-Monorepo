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
  HelpCircle,
} from "lucide-react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/QuizCard";
import { Progress } from "../../components/ui/Progress";
import Modal from "../../components/ui/Modal";

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
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);

  // Function to request full-screen mode
  const requestFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // For Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // For Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // For IE/Edge
      element.msRequestFullscreen();
    }
  };

  // Fetch quiz questions and start the quiz
  useEffect(() => {
    const initializeQuiz = async () => {
      setIsLoading(true);
      try {
        const startResponse = await startQuiz(quizId);

        if (startResponse?.status === 200) {
          setQuizStarted(true);
          setQuizDetails(startResponse.quiz);
          const questionResponse = await getQuizQuestions(quizId, 1);

          if (questionResponse?.questions) {
            setQuestions(questionResponse.questions);
            setTotalPages(questionResponse.pagination.last_page);
            setTimeLeft(startResponse.quiz.Duration * 60); // Convert minutes to seconds

            setTotalQuestions(questionResponse.pagination.total);
            setAllQuestions((prev) => {
              const newQuestions = [...prev];
              questionResponse.questions.forEach((q) => {
                newQuestions[0] = questionResponse.questions;
              });
              return newQuestions;
            });
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

        setAllQuestions((prev) => {
          const newQuestions = [...prev];
          newQuestions[page - 1] = response.questions;
          return newQuestions;
        });
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

  // Calculate progress correctly based on total questions
  useEffect(() => {
    if (totalQuestions > 0) {
      const answeredCount = Object.keys(selectedAnswers).length;
      const calculatedProgress = (answeredCount / totalQuestions) * 100;
      setProgressValue(Math.min(calculatedProgress, 100)); // Ensure progress doesn't exceed 100%
    }
  }, [selectedAnswers, totalQuestions]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return { minutes: formattedMinutes, seconds: formattedSeconds };
  };

  if (isLoading) {
    return <Loading />;
  }

  const timeFormatted = formatTime(timeLeft);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Enhanced Header Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold">{quizDetails?.Title}</h1>
                <p className="text-indigo-100">{quizDetails?.Description}</p>
              </div>
              {/* Timer Card - Now with glass morphism effect */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-white" />
                    <div className="space-y-1">
                      <p className="text-sm text-white/80">Time Remaining</p>
                      <p className="text-2xl font-bold text-white font-mono">
                        {timeFormatted.minutes}:{timeFormatted.seconds}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quiz Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Course</p>
              <p className="font-medium text-gray-900">
                {quizDetails?.CourseName}
              </p>
              <p className="text-sm text-gray-600">{quizDetails?.CourseCode}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Total Marks</p>
              <p className="font-medium text-gray-900">
                {quizDetails?.TotalMarks} Points
              </p>
              <p className="text-sm text-gray-600">
                {Object.keys(selectedAnswers).length} of {totalQuestions}{" "}
                answered
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium text-gray-900">
                {quizDetails?.Duration} Minutes
              </p>
              <p className="text-sm text-gray-600">
                Started at{" "}
                {new Date(quizDetails?.StartTime).toLocaleTimeString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Due</p>
              <p className="font-medium text-gray-900">
                {new Date(quizDetails?.EndTime).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(quizDetails?.EndTime).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Overall Progress</span>
            <span>{Math.round(progressValue)}% Complete</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
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
          <span className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium">
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

        {/* Questions */}
        {questions.map((question) => (
          <Card key={question.QuestionID} className="overflow-hidden">
            <CardContent className="p-6 space-y-6">
              {question.image && (
                <div className="relative">
                  <img
                    src={`http://127.0.0.1:8000/storage/${question.image}`}
                    alt={question.Content}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold">
                    Q{currentPage}
                  </span>
                  {question.Content}
                </h2>
                <div className="space-y-3">
                  {question.answers.map((answer) => (
                    <div
                      key={answer.AnswerID}
                      onClick={() =>
                        handleAnswerSelect(
                          question.QuestionID,
                          answer.AnswerText
                        )
                      }
                      className={`relative flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAnswers[question.QuestionID] ===
                        answer.AnswerText
                          ? "bg-indigo-50 border-2 border-indigo-500"
                          : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[question.QuestionID] ===
                          answer.AnswerText
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-gray-400"
                        }`}
                      >
                        {selectedAnswers[question.QuestionID] ===
                          answer.AnswerText && (
                          <div className="w-2 h-2 rounded-full bg-white" />
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
        ))}

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={() => setShowConfirmSubmit(true)}
            variant={"default"}
          >
            <CheckCircle className="w-5 h-5 mr-2" /> Submit Quiz
          </Button>
        </div>

        {/* Confirm Submit Dialog */}
        <Modal
          isOpen={showConfirmSubmit}
          closeModal={() => setShowConfirmSubmit(false)}
          title="Confirm Quiz Submission"
          description="Are you sure you want to submit your quiz? You won't be able to change your answers after submission."
        >
          <div className="flex justify-end gap-2 mt-5">
            <Button
              variant="cancel"
              onClick={() => setShowConfirmSubmit(false)}
            >
              Cancel
            </Button>
            <Button variant="default" onClick={handleSubmitQuiz}>
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QuizInterface;
