import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  endQuizService,
  getQuizQuestions,
  startQuiz,
  submitQuiz,
} from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import toast from "react-hot-toast";
import { AlertTriangle, CheckCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import QuizHeader from "../../components/quiz interface/QuizHeader";
import QuizProgress from "../../components/quiz interface/QuizProgress";
import FloatingTimer from "../../components/quiz interface/FloatingTimer";
import FloatingNavigation from "../../components/quiz interface/FloatingNavigation";
import QuestionCard from "../../components/quiz interface/QuestionCard";
import VerifyFace from "../../components/VerifyFace";
import QuizInstructions from "./QuizInstructions";

const QuizInterface = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const fullscreenButtonRef = useRef(null);
  const [cheatingScore, setCheatingScore] = useState(0);
  const [cheatingAlerts, setCheatingAlerts] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const [studentId, setStudentId] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [showCheatingWarning, setShowCheatingWarning] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const intervalRef = useRef(null);

  // Load the token after login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    } else {
      console.error("No auth token found. User may not be authenticated.");
      toast.error("Please log in to continue.");
    }
  }, []);

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

  // Initialize webcam
  const initializeWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user", frameRate: 30 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            .play()
            .then(() => {
              setIsVideoReady(true);
              console.log(
                "Webcam stream settings:",
                stream.getVideoTracks()[0].getSettings()
              );
            })
            .catch((err) => {
              console.error("Error playing video:", err);
              toast.error("Failed to play webcam stream.");
            });
        };
      }
    } catch (err) {
      console.error("Webcam error:", err);
      toast.error(
        "Failed to access webcam. Please ensure permissions are granted."
      );
    }
  };

  // Stop webcam stream
  const stopWebcamStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null; // Clear the stream
      console.log("Webcam stream stopped");
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
        setCheatingAlerts((prev) => [
          ...prev,
          "You have exited full-screen mode. Please return to full-screen mode.",
        ]);
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

  // Initialize WebSocket and periodic image capture
  useEffect(() => {
    if (!quizStarted || !studentId || !authToken) return;
    console.log(
      "Connecting WebSocket:",
      `ws://localhost:8001/ws/${studentId}/${quizId}`
    );

    // Initialize Webcam
    initializeWebcam();

    // Initialize WebSocket connection
    wsRef.current = new WebSocket(
      `ws://localhost:8001/ws/${studentId}/${quizId}`
    );
    wsRef.current.onopen = () => console.log("WebSocket connected");
    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast.error("Failed to connect to cheating detection service.");
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received WebSocket message:", data);
        if (data.type === "alert") {
          // Show each alert as a toast
          data.message.forEach((alert) => {
            toast.custom(
              (t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-md w-full bg-red-600 text-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium">Cheating Alert</p>
                        <p className="mt-1 text-sm">{alert}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-red-700">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ),
              {
                duration: 5000,
                position: "top-right",
              }
            );
          });
          // Update cheating score
          const newScore = Math.min(
            data.new_score || cheatingScore + data.score_increment,
            100
          );
          setCheatingScore(newScore);

          if (data.auto_submitted || newScore >= 100) {
            console.log("Cheating score reached 100, handling auto-submission");
            stopWebcamStream();
            if (wsRef.current) wsRef.current.close();
            if (intervalRef.current) clearInterval(intervalRef.current);

            // Show the cheating warning modal immediately
            setShowCheatingWarning(true);

            // Send selected answers to FastAPI for automatic submission
            const payload = {
              student_id: studentId,
              quiz_id: quizId,
              answers: Object.entries(selectedAnswers).map(
                ([questionId, answer]) => ({
                  question_id: questionId.toString(),
                  answer: answer,
                })
              ),
              auth_token: authToken,
            };
            console.log("Sending payload to /submit_due_to_cheating:", payload);
            fetch("http://localhost:8001/submit_due_to_cheating", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
              .then((response) => response.json())
              .then((result) => {
                console.log("Response from /submit_due_to_cheating:", result);
                // Navigate to results page after a delay if modal isn't interacted with
                setTimeout(() => {
                  if (showCheatingWarning) {
                    console.log(
                      "Modal not interacted with, auto-navigating to results"
                    );
                    setShowCheatingWarning(false);
                    setQuizStarted(false); // Now safe to set quizStarted to false
                    exitFullscreen();
                    navigate("/student/quiz-results", {
                      state: { cheatingScore: newScore },
                    });
                  }
                }, 5000); // 5 seconds delay
              })
              .catch((err) => {
                console.error("Error submitting due to cheating:", err);
                toast.error("Error submitting quiz due to cheating detection.");
                // Navigate even if fetch fails
                setTimeout(() => {
                  if (showCheatingWarning) {
                    console.log(
                      "Modal not interacted with (fetch failed), auto-navigating to results"
                    );
                    setShowCheatingWarning(false);
                    setQuizStarted(false);
                    exitFullscreen();
                    navigate("/student/quiz-results", {
                      state: { cheatingScore: newScore },
                    });
                  }
                }, 5000);
              });
          }
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };
    wsRef.current.onclose = () => console.log("WebSocket closed");

    // Periodically capture image from webcam
    const interval = setInterval(async () => {
      if (
        !quizStarted ||
        !videoRef.current ||
        !canvasRef.current ||
        !isVideoReady
      )
        return;
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 1280, 720);
      const imageData = canvasRef.current.toDataURL("image/jpeg", 0.8);
      console.log("Full base64 image:", imageData);
      const payload = {
        student_id: studentId,
        quiz_id: quizId,
        image_b64: imageData,
        auth_token: authToken,
      };
      console.log("Sending to /process_periodic:", payload);
      try {
        const response = await fetch("http://localhost:8001/process_periodic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok) {
          console.error("Process periodic error:", result);
          toast.error(
            `Cheating detection failed: ${result.error || "Unknown error"}`
          );
        } else {
          console.log("Process periodic success:", result);
        }
      } catch (err) {
        console.error("Error processing image:", err);
        toast.error("Error in cheating detection.");
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (wsRef.current) wsRef.current.close();
      stopWebcamStream();
    };
  }, [
    quizStarted,
    studentId,
    isVideoReady,
    authToken,
    selectedAnswers,
    cheatingScore,
  ]);

  // Handle face verification and start quiz
  const handleVerifyFace = async (capturedFrame) => {
    setIsLoading(true);
    try {
      const startResponse = await startQuiz(quizId, capturedFrame);
      if (startResponse?.status === 200) {
        setStudentId(startResponse.student_id);
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
            newQuestions[0] = questionResponse.questions;
            return newQuestions;
          });
          requestFullscreen();
        } else {
          throw new Error("No questions received");
        }
      } else {
        if (startResponse?.debug) {
          console.error("Face verification debug:", startResponse.debug);
        }
        throw new Error(startResponse?.message || "Failed to start quiz");
      }
    } catch (error) {
      console.error("Quiz start failed:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        const result = await endQuizService(quizId);
        console.log("Response return from endQuizService:", result);
        setCheatingScore(result.cheating_score || 0);
        toast.success(response.message || "Quiz submitted successfully!");
        setQuizStarted(false);
        stopWebcamStream();
        exitFullscreen();
        navigate("/student/quiz-results", {
          state: { cheatingScore: result.cheating_score || 0 },
        });
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
        {showInstructions ? (
          <QuizInstructions onAcknowledge={() => setShowInstructions(false)} />
        ) : !quizStarted ? (
          <VerifyFace onCapture={handleVerifyFace} />
        ) : (
          <>
            <video ref={videoRef} className="hidden" autoPlay playsInline />
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="hidden"
            />
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
            <div className="mb-4">
              <p className="text-lg font-semibold">
                Cheating Score: {cheatingScore}
              </p>
            </div>

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
              closeModal={() => setShowFullscreenWarning(false)}
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
          </>
        )}
        {/* Cheating Warning Modal */}
        <Modal
          isOpen={showCheatingWarning}
          title="Cheating Detected"
          description="Your cheating score has reached 100. The quiz has been automatically submitted due to detected cheating behavior. You will now be redirected to the results page."
          closeModal={() => setShowCheatingWarning(false)}
        >
          <div className="flex justify-center mt-5">
            <Button
              variant="default"
              onClick={() => {
                setShowCheatingWarning(false);
                exitFullscreen();
                navigate("/student/quiz-results", {
                  state: { cheatingScore: cheatingScore },
                });
              }}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Go to Results
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QuizInterface;
