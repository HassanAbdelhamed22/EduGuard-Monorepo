import React, { useState } from "react";
import { resetPass } from "./../../services/authService";
import { resetPassValidationSchema } from "../../utils/validation";
import { useFormik } from "formik";

const ResetPass = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(value) {
    setIsLoading(true);
    try {
      const { data, status } = await resetPass(value);

      if (status === 200) {
        toast.success(data.message);

        setTimeout(() => {
          window.location.href = "/send-code";
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

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    handleSubmit,
    resetPassValidationSchema,
  });
  return <div>ResetPass</div>;
};

export default ResetPass;
