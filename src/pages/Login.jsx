import React, { useState } from "react";
import * as Yup from "yup";
import { BASE_URL } from "../constants";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { saveUserData } from "../utils/functions";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Logo from "../components/Logo";
import img from "../assets/auth/loginImg.svg";
import Button from "./../components/ui/Button";

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
        <Button className="rounded-full">Sign Up</Button>
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

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.password && touched.password
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember Me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary hover:text-primaryHover hover:line- duration-300"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primaryHover
                    duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Signing in..." : "Login"}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-mediumGray">
                      Don't have an account?{" "}
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
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

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="h-5 w-5"
                      loading="lazy"
                    />
                    Login with Google
                  </button>
                </Form>
              )}
            </Formik>
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
