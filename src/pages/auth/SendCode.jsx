import React, { useState } from "react";
import { sendCode } from "./../../services/authService";
import { resetPassValidationSchema } from "../../utils/validation";
import { Form, Formik, useFormik } from "formik";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Logo from "../../components/Logo";
import img from "../../assets/auth/forgot-password.svg";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const SendCode = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(value) {
    setIsLoading(true);
    try {
      const { data, status } = await sendCode(value);

      if (status === 200) {
        toast.success(
          "Password reset successfully, you will navigate to the login page after 2 seconds!"
        );

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const initialValues = {
    email: "",
    otp: "",
    password: "",
    password_confirmation: "",
  };
  return <div>SendCode</div>;
};

export default SendCode;
