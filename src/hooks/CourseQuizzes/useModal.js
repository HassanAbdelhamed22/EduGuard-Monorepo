import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    quizId: null,
    quizData: null,
  });

  const openModal = (type, quizId, quizData = null) => {
    setModal({
      isOpen: true,
      type,
      quizId,
      quizData,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      quizId: null,
      quizData: null,
    });
  };

  return { modal, openModal, closeModal };
};

export default useModal;
