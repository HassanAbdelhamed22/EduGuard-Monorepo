import React, { useState } from "react";
import toast from "react-hot-toast";
import { suspendUser, unSuspendUser } from "../services/adminService";
import Loading from "./ui/Loading";
import Button from "./ui/Button";
import PaginationLogic from "./PaginationLogic";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import UserTable from "./Tables/UserTable";
import SearchBar from "./ui/SearchBar";

const UserManagementPage = ({
  users,
  pagination,
  isLoading,
  fetchUsers,
  pageTitle,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");
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

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setReason("");
  };

  const handleConfirmBlock = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason to block the user");
      return;
    }

    try {
      await suspendUser(selectedUser.id, reason);
      toast.success("User has been blocked successfully");
      fetchUsers(pagination.current_page);
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleBlockToggle = async (user) => {
    if (user.is_blocked) {
      try {
        await unSuspendUser(user.id);
        toast.success("User has been unblocked successfully");
        fetchUsers(pagination.current_page);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      openModal(user);
    }
  };

  // search by name
  const handleSearch = (event) => {
    // Extract the value from the event object
    const value = event?.target?.value ?? "";
    setSearchQuery(value);
  };

  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading && users.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-darkGray">{pageTitle}</h2>
        <SearchBar
          placeholder="Search by name..."
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>

      {filteredUsers.length > 0 ? (
        <UserTable
          users={filteredUsers}
          onBlockToggle={handleBlockToggle}
        />
      ) : (
        <p className="text-center text-mediumGray font-bold text-xl">No users found.</p>
      )}

      <PaginationLogic
        pagination={pagination}
        handlePageChange={handlePageChange}
      />

      {/* Suspension Reason Modal */}
      <Modal isOpen={isModalOpen} title="Block User" closeModal={closeModal}>
        <div className="mt-2">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Reason for blocking user
          </label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason..."
            className="mt-1 p-2 w-full border rounded-md"
            rows="3"
          ></Textarea>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={closeModal} variant={"cancel"}>
            Cancel
          </Button>
          <Button onClick={handleConfirmBlock} variant={"danger"}>
            Block
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
