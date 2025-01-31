import { useEffect, useState } from "react";
import { getAllStudents } from "../../services/adminService";

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = async (page) => {
    setIsLoading(true);
    try {
      const { students, pagination } = await getAllStudents(page);
      setStudents(students);
      setPagination({ ...pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1);
  }, []);

  return { students, pagination, isLoading, fetchStudents };
};

export default useStudents;
