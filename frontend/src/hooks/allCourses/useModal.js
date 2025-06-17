import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    courseId: null,
    courseData: null,
  });

  const openModal = (type, courseId, courseData = null) => {
    setModal({
      isOpen: true,
      type,
      courseId,
      courseData,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      courseId: null,
      courseData: null,
    });
  };

  return { modal, openModal, closeModal };
};

export default useModal;
