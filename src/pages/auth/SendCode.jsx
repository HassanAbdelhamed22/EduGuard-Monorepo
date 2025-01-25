import React, { useState } from "react";
import { sendCode } from "./../../services/authService";
import { resetPassValidationSchema } from "../../utils/validation";
import { Form, Formik } from "formik";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Logo from "../../components/Logo";
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
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Logo />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </header>

      <div className="container max-w-6xl px-4 mx-auto mt-3">
        {/* Form Section */}
        <div className="flex-1 w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 ">
            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Send OTP Code
              </h2>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={resetPassValidationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="name@example.com"
                      className={`w-full ${
                        touched.email && errors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-200 focus-visible:ring-violet-500"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      OTP Code
                    </label>
                    <Input
                      type="text"
                      id="otp"
                      name="otp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.otp}
                      placeholder="Your OTP code"
                      className={`w-full ${
                        touched.otp && errors.otp
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-200 focus-visible:ring-violet-500"
                      }`}
                    />
                    {touched.otp && errors.otp && (
                      <p className="text-sm text-red-500 mt-1">{errors.otp}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Your password"
                      className={`w-full ${
                        touched.password && errors.password
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-200 focus-visible:ring-violet-500"
                      }`}
                    />
                    {touched.password && errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="password_confirmation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password Confirmation
                    </label>
                    <Input
                      type="password_confirmation"
                      id="password_confirmation"
                      name="password_confirmation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                      placeholder="Confirm your password"
                      className={`w-full ${
                        touched.password_confirmation &&
                        errors.password_confirmation
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-200 focus-visible:ring-violet-500"
                      }`}
                    />
                    {touched.password_confirmation &&
                      errors.password_confirmation && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.password_confirmation}
                        </p>
                      )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                    disabled={isSubmitting || isLoading}
                    isLoading={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading
                      ? "Sending..."
                      : "Reset Password"}
                  </Button>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    Remember your password?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-violet-600 hover:text-violet-700 font-medium"
                    >
                      Login here
                    </button>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendCode;
