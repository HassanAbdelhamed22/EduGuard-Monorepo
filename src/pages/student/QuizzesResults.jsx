import React, { useState } from "react";
import { getSubmittedQuizzes } from "../../services/studentService";

const QuizzesResults = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      fetchQuizDetails(page);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const { data, pagination } = await getSubmittedQuizzes();
      setQuizDetails(data);
      setPagination({ ...pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return <div>QuizzesResults</div>;
};

export default QuizzesResults;
