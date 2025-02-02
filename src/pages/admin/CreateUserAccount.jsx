import React, { useState } from "react";
import toast from "react-hot-toast";
import { createUserAccount } from "../../services/adminService";
import { createUserAccountValidationSchema } from "../../utils/validation";
import CreateUserAccountForm from "../../components/forms/createUserAccountForm";

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
    role: "user",
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
        error.response?.data?.message ;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-white mt-20">
      <h2 className="text-2xl font-semibold mb-6 pb-4 text-center border-b text-primary">
        Create User Account
      </h2>

      <CreateUserAccountForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createUserAccountValidationSchema}
        isLoading={isLoading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showPasswordConfirmation={showPasswordConfirmation}
        setShowPasswordConfirmation={setShowPasswordConfirmation}
      />
    </div>
  );
};

export default CreateUserAccount;
