import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    userId: null,
    userData: null,
    selectedRole: null,
  });

  const openModal = (type, userId, userData = null, selectedRole = null) => {
    setModal({
      isOpen: true,
      type,
      userId,
      userData,
      selectedRole,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      userId: null,
      userData: null,
      selectedRole: null,
    });
  };

  return { modal, openModal, closeModal };
};

export default useModal;