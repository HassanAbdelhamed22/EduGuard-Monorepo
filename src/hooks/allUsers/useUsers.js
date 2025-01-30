import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminService";
import toast from "react-hot-toast";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (page) => {
    setIsLoading(true);
    try {
      const { data, pagination } = await getAllUsers(page);
      setUsers(data);
      setPagination({ ...pagination, current_page: page });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  return { users, pagination, isLoading, fetchUsers };
};

export default useUsers;