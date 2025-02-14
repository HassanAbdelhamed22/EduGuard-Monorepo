import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentAnswers } from "../../services/studentService";
import Loading from "../../components/ui/Loading";

const StudentAnswers = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchStudentAnswers(page);
    }
  };

  const fetchStudentAnswers = async (page) => {
    try {
      setIsLoading(true);
      const response = await getStudentAnswers(quizId, page);
      setQuiz(response.data);
    } catch (error) {
      console.error("Error fetching student answers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentAnswers();
  }, [quizId]);

  if (isLoading) {
    return <Loading />;
  }

  return <div>StudentAnswers</div>;
};

export default StudentAnswers;
