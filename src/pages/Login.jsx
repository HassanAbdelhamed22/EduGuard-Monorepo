import React, { useState } from "react";
import * as Yup from "yup";
import { BASE_URL } from "../constants";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { saveUserData } from "../utils/functions";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /^[A-Z][a-zA-Z0-9]{5,}$/,
      "Password must start with an uppercase letter and contain at least 6 characters"
    ),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(`${BASE_URL}auth/login`, values);

      if (data.message === "Login successful") {
        saveUserData(data.data);

        toast.success("Login successful");

        const roleRedirects = {
          admin: "/admin/dashboard",
          professor: "/professor/dashboard",
          user: "/student/dashboard",
        };

        window.location.href = roleRedirects[data.data.role] || "/login";
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

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return <div>Login</div>;
};

export default Login;
