import React from "react";
import { updatePassword } from "../../services/authService";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const initialValues = {
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const { data, status } = await updatePassword(values);

      if (status === 200) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };
  return <div>UpdatePassword</div>;
};

export default UpdatePassword;
