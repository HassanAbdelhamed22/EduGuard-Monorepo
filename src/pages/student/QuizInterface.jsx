import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQuizQuestions,
  startQuiz,
  submitQuiz,
} from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import QuizHeader from "../../components/quiz interface/QuizHeader";
import QuizProgress from "../../components/quiz interface/QuizProgress";
import FloatingTimer from "../../components/quiz interface/FloatingTimer";
import FloatingNavigation from "../../components/quiz interface/FloatingNavigation";
import QuestionCard from "../../components/quiz interface/QuestionCard";
import { set } from "lodash";
import { use } from "react";

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
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const fullscreenButtonRef = useRef(null);

  // Function to request full-screen mode
  const requestFullscreen = () => {
    const element = document.documentElement;

    try {
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
    } catch (error) {
      console.error("Error requesting full-screen mode:", error);
      toast.error("Could not request full-screen mode. Please try again.");
    }
  };

  // Function to exit full-screen mode
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // For Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // For Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // For IE/Edge
      document.msExitFullscreen();
    }
  };

  // Disable copying, right-click, and keyboard shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    const handleCopy = (e) => {
      e.preventDefault();
    };
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCopy);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Detect tab switching or window minimization
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast.error("Do not switch tabs or windows during the quiz!");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    };

    if (quizStarted) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [quizStarted]);

  // Prevent exiting full-screen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && quizStarted) {
        toast.error("Please do not exit full-screen mode during the quiz.");

        setShowFullscreenWarning(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [quizStarted]);

  // Focus on the fullscreen button
  useEffect(() => {
    if (showFullscreenWarning && fullscreenButtonRef.current) {
      setTimeout(() => {
        fullscreenButtonRef.current.focus();
      }, 100);
    }
  }, [showFullscreenWarning]);

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
            setTimeLeft(startResponse.quiz.Duration * 60);

            setTotalQuestions(questionResponse.pagination.total);
            setAllQuestions((prev) => {
              const newQuestions = [...prev];
              questionResponse.questions.forEach((q) => {
                newQuestions[0] = questionResponse.questions;
              });
              return newQuestions;
            });

            requestFullscreen();
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

    return () => {
      exitFullscreen();
    };
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
        navigate("/student/quiz-results");
      } else {
        throw new Error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Quiz submission failed:", error);
      toast.error(error.response?.data?.message || "Failed to submit quiz");
    }
  };

  // Calculate progress based on total questions
  useEffect(() => {
    if (totalQuestions > 0) {
      const answeredCount = Object.keys(selectedAnswers).length;
      const calculatedProgress = (answeredCount / totalQuestions) * 100;
      setProgressValue(Math.min(calculatedProgress, 100));
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
        <QuizHeader
          quizDetails={quizDetails}
          timeFormatted={timeFormatted}
          selectedAnswers={selectedAnswers}
          totalQuestions={totalQuestions}
        />
        <QuizProgress progressValue={progressValue} />
        <FloatingTimer
          progressValue={progressValue}
          timeFormatted={timeFormatted}
        />
        <FloatingNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          fetchQuestions={fetchQuestions}
        />

        {/* Questions */}
        {questions.map((question) => (
          <QuestionCard
            key={question.QuestionID}
            question={question}
            currentPage={currentPage}
            handleAnswerSelect={handleAnswerSelect}
            selectedAnswers={selectedAnswers}
          />
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

        {/* Fullscreen Warning Modal */}
        <Modal
          isOpen={showFullscreenWarning}
          // closeModal={() => setShowFullscreenWarning(false)}
          title="Fullscreen Warning"
          description="You have exited fullscreen mode. This is not allowed during the quiz. Please click the button below to return to fullscreen mode."
        >
          <div className="flex justify-center mt-5">
            <Button
              ref={fullscreenButtonRef}
              variant="default"
              onClick={() => {
                requestFullscreen();
                setShowFullscreenWarning(false);
              }}
            >
              Return to Fullscreen
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QuizInterface;
