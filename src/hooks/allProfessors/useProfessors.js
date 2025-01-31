import { useEffect, useState } from "react";
import { getAllProfessors } from "../../services/adminService";

const useProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfessors = async (page) => {
    setIsLoading(true);
    try {
      const { professors, pagination } = await getAllProfessors(page);
      setProfessors(professors);
      setPagination({ ...pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessors(1);
  }, []);

  return { professors, pagination, isLoading, fetchProfessors };
};

export default useProfessors;
