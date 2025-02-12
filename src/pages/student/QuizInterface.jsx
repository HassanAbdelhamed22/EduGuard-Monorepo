import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizQuestions, startQuiz } from "../../services/studentService";

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
      setCurrentPage(page)
    } catch (error) {
      console.error(error);
    }
  }

  //** Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return <div>QuizInterface</div>;
};

export default QuizInterface;
