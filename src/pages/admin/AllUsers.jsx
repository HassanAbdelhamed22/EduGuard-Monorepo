import React, { useState } from "react";
import {
  assignRole,
  deleteUserAccount,
  updateUserAccount,
} from "../../services/adminService";
import { toast } from "react-hot-toast";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";
import Modal from "../../components/ui/Modal";
import UpdateUserAccountForm from "../../components/forms/UpdateUserAccountForm";
import AssignRoleForm from "../../components/forms/AssignRoleForm";
import useUsers from "../../hooks/allUsers/useUsers";
import useModal from "../../hooks/allUsers/useModal";
import AllUsersTable from "../../components/Tables/AllUsersTable";
import PaginationLogic from "../../components/PaginationLogic";
import SearchBar from "./../../components/ui/SearchBar";

const AllUsers = () => {
  const { users, pagination, isLoading, fetchUsers } = useUsers();
  const { modal, openModal, closeModal } = useModal();
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page > 0 &&
      page <= pagination.total_pages
    ) {
      fetchUsers(page);
    }
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
      const updatedFields = {};
      for (const key in values) {
        if (values[key] !== modal.userData[key] && values[key] !== "") {
          updatedFields[key] = values[key];
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        toast.error("No fields have been updated.");
        return;
      }

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
        toast.error("Failed to update user");
      }
    } catch (err) {
      console.error("Update error:", err); // Log the full error object
      toast.error(
        err?.response?.data?.message || "An error occurred during update."
      );
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
      const { status } = await assignRole(modal.userId, selectedRole);
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

  // search by name
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

    if (modal.type === "edit" && modal.userData) {
      return (
        <UpdateUserAccountForm
          initialValues={modal.userData} // Ensure this receives data
          onSubmit={handleUpdate}
          isLoading={isLoading}
          closeModal={closeModal}
        />
      );
    }

    if (modal.type === "assignRole" && modal.selectedRole !== null) {
      return (
        <AssignRoleForm
          initialRole={modal.selectedRole} // Ensure this receives data
          onSubmit={(role) => handleAssignRole(role)}
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
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-darkGray">All Users</h2>
        <SearchBar
          placeholder="Search by name..."
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>

      {filteredUsers.length > 0 ? (
        <AllUsersTable
          users={filteredUsers}
          onAssignRole={(userId, role) =>
            openModal("assignRole", userId, null, role)
          }
          onDelete={(id) => openModal("delete", id)}
          onEdit={(userId, userData) => openModal("edit", userId, userData)}
        />
      ) : (
        <p className="text-center text-mediumGray font-bold text-xl">
          No users found.
        </p>
      )}

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
      />

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
