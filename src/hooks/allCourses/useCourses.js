import { useEffect, useState } from "react";
import { getAllCourses } from "../../services/adminService";
import toast from "react-hot-toast";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = async (page) => {
    setIsLoading(true);
    try {
      const { data, pagination } = await getAllCourses(page);
      setCourses(data);
      setPagination({ ...pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(1);
  }, []);

  return { courses, pagination, isLoading, fetchCourses };
};

export default useCourses;
