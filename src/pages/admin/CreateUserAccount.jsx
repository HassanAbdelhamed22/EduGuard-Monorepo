import React, { useState } from "react";
import toast from "react-hot-toast";
import { createUserAccount } from "../../services/adminService";

const CreateUserAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
    role: "student",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { data, status } = await createUserAccount(values);

      if (status === 201) {
        toast.success(data.message);
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return <div></div>;
};

export default CreateUserAccount;
