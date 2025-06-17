import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    materialId: null,
    materialData: null,
  });

  const openModal = (type, materialId, materialData = null) => {
    setModal({
      isOpen: true,
      type,
      materialId,
      materialData,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      materialId: null,
      materialData: null,
    });
  };

  return { modal, openModal, closeModal };
};

export default useModal;
