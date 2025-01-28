import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { getAllUsers } from "../../services/adminService";
import { stat } from "./../../../node_modules/@types/node/fs.d";
import { use } from "react";

const AllUsers = () => {
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
      const response = await getAllUsers(page);

      if (response.status === 200) {
        setUsers(response.data);
        setPagination(response.pagination);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} striped>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.color}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsers;
