import React, { useState } from "react";
import * as Yup from "yup";
import { BASE_URL } from "../../constants";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { saveUserData } from "../../utils/functions";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Logo from "../../components/Logo";
import img from "../../assets/auth/loginImg.svg";
import Button from "../../components/ui/Button";
import LoginForm from "../../components/auth/LoginForm";
import { loginValidationSchema } from "../../utils/validation";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      console.log("Submitting values:", values); // Debugging
      let { data, status } = await axios.post(
        `${BASE_URL}auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 200) {
        saveUserData(data.data);
        toast.success(
          "Login successful, you will navigate to the dashboard page after 2 seconds!"
        );

        // Redirect logic
        const roleRedirects = {
          admin: "/admin/dashboard",
          professor: "/professor/dashboard",
          user: "/student/dashboard",
        };

        setTimeout(() => {
          window.location.href = roleRedirects[data.data.role] || "/login";
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Logo />
        <Button variant="outline" size="sm">
          Sign Up
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Login Form */}
          <div className="space-y-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-darkGray">Login now!</h2>
              <p className="mt-2 text-mediumGray">Hi, Welcome back 👋</p>
            </div>

            <LoginForm
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </a>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  or Login with Google
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              fullWidth
              className="gap-2"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5"
                loading="lazy"
              />
              Login with Google
            </Button>
          </div>

          {/* Illustration */}
          <div className="hidden md:block">
            <img
              src={img}
              alt="Education Illustration"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
