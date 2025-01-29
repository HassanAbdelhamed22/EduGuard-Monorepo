import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import {
  deleteUserAccount,
  getAllUsers,
  updateUserAccount,
} from "../../services/adminService";
import { toast } from "react-hot-toast";
import Button from "../../components/ui/Button";
import { Pencil, Trash2, UserCog } from "lucide-react";
import Loading from "../../components/ui/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/Pagination";
import Modal from "../../components/ui/Modal";
import UpdateUserAccountForm from "../../components/forms/UpdateUserAccountForm";
import { is } from "./../../../node_modules/immer/src/utils/common";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    userId: null,
    userData: null,
  });

  const initialValues = {
    name: modal.userData?.name || "",
    email: modal.userData?.email || "",
    phone: modal.userData?.phone || "",
    address: modal.userData?.address || "",
  };

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

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchUsers(page);
    }
  };

  const openDeleteModal = (userId) => {
    setModal({
      isOpen: true,
      type: "delete",
      userId,
      userData: null,
    });
  };

  const openEditModal = (user) => {
    setModal({
      isOpen: true,
      type: "edit",
      userId: user.id,
      userData: { ...user },
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      userId: null,
      userData: null,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteUserAccount(modal.userId);
      toast.success("User deleted successfully");
      closeModal();
      fetchUsers(pagination.current_page);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (values, { setSubmitting, setFieldError }) => {
    try {
      await updateUserAccount(modal.userId, values);
      toast.success("User updated successfully");
      closeModal();
      fetchUsers(pagination.current_page);
    } catch (err) {
      if (err.response?.data?.errors) {
        // Handle validation errors from the server
        Object.keys(err.response.data.errors).forEach((key) => {
          setFieldError(key, err.response.data.errors[key][0]);
        });
      } else {
        setError("Failed to update user");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderModalContent = () => {
    if (modal.type === "delete") {
      return (
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      );
    }

    if (modal.type === "edit") {
      return (
        <UpdateUserAccountForm
          initialValues={initialValues}
          onSubmit={handleUpdate}
          isLoading={isLoading}
        />
      );
    }
  };

  if (isLoading && users.length === 0) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-darkGray">All Users</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">ID</TableHead>
            <TableHead className="w-2/12">Name</TableHead>
            <TableHead className="w-1/12">Email</TableHead>
            <TableHead className="w-1/12">Phone</TableHead>
            <TableHead className="w-1/12">Address</TableHead>
            <TableHead className="w-1/12">Role</TableHead>
            <TableHead className="w-1/12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size={"icon"} title="Assign Role">
                    <UserCog className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      /* Implement edit */
                    }}
                    title="Edit User"
                  >
                    <Pencil className="h-4 w-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDeleteModal(user.id)}
                    title="Delete User"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                pagination.current_page > 1 &&
                handlePageChange(pagination.current_page - 1)
              }
              className={
                pagination.current_page <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === pagination.current_page}
                  className={`${
                    page === pagination.current_page ? "" : "cursor-pointer"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                pagination.current_page < pagination.total_pages &&
                handlePageChange(pagination.current_page + 1)
              }
              className={
                pagination.current_page >= pagination.total_pages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Modal
        isOpen={modal.isOpen}
        closeModal={closeModal}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      >
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant={"danger"} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AllUsers;
