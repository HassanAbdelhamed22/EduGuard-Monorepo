import React, { useEffect, useState } from "react";
import {
  assignRole,
  deleteUserAccount,
  getAllUsers,
  updateUserAccount,
} from "../../services/adminService";
import { toast } from "react-hot-toast";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";
import Modal from "../../components/ui/Modal";
import UpdateUserAccountForm from "../../components/forms/UpdateUserAccountForm";
import AssignRoleForm from "../../components/forms/AssignRoleForm";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(user);
    setModal({
      isOpen: true,
      type: "edit",
      userId: user.id,
      userData: user,
    });
  };

  const openAssignRoleModal = (userId) => {
    const user = users.find((u) => u.id === userId);
    setModal({
      isOpen: true,
      type: "assignRole",
      userId,
      userData: null,
      selectedRole: user?.role || null,
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

  const handleUpdate = async (values) => {
    try {
      setIsLoading(true);
      const updatedFields = {};
      for (const key in values) {
        if (values[key] !== initialValues[key] && values[key] !== "") {
          updatedFields[key] = values[key];
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        toast.error("No fields have been updated.");
        return;
      }

      console.log("Updated Fields:", updatedFields); // Debugging

      // Send only the updated fields to the backend
      const { data, status } = await updateUserAccount(
        modal.userId,
        updatedFields
      );
      if (status === 200) {
        toast.success("User updated successfully");
        closeModal();
        fetchUsers(pagination.current_page);
      } else {
        console.error("Update failed", data);
        toast.error("Failed to update user");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignRole = async (selectedRole) => {
    if (!modal.userId) {
      toast.error("User ID is required");
      return;
    }

    // Find the user in the `users` state
    const user = users.find((u) => u.id === modal.userId);

    // Check if the selected role is the same as the current role
    if (user && user.role === selectedRole) {
      toast.error("This user already has the selected role");
      return;
    }

    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    try {
      const { data, status } = await assignRole(
        modal.userId,
        selectedRole
      );
      if (status === 200) {
        toast.success("Role assigned successfully");
        closeModal();
        fetchUsers(pagination.current_page);
      } else {
        toast.error("Failed to assign role");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
          closeModal={closeModal}
        />
      );
    }

    if (modal.type === "assignRole") {
      return (
        <AssignRoleForm
          initialRole={modal.selectedRole}
          onSubmit={(role) => {
            handleAssignRole(role);
          }}
          onCancel={closeModal}
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

      <Modal
        isOpen={modal.isOpen}
        closeModal={closeModal}
        title={
          modal.type === "delete"
            ? "Delete User"
            : modal.type === "edit"
            ? "Edit User"
            : "Assign Role"
        }
        description={
          modal.type === "delete"
            ? "Are you sure you want to delete this user? This action cannot be undone."
            : modal.type === "edit"
            ? "Update user information"
            : "Select a role to assign to the user"
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default AllUsers;
