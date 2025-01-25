import React, { useState } from "react";
import { resetPass } from "./../../services/authService";
import { resetPassValidationSchema } from "../../utils/validation";
import { Form, Formik, useFormik } from "formik";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Logo from "../../components/Logo";
import img from "../../assets/auth/forgot-password.svg";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const ResetPass = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(value) {
    setIsLoading(true);
    try {
      const { data, status } = await resetPass(value);

      if (status === 200) {
        toast.success(
          "Password reset link sent successfully, you will navigate to the send code page after 2 seconds!"
        );

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

  const initialValues = {
    email: "",
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

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] ">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Form Section */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 ">
                <div className="mb-6 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Forgot Password?
                  </h2>
                  <p className="text-gray-600">
                    Don't worry! Enter your email and we'll send you
                    instructions to reset your password.
                  </p>
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

                      <Button
                        type="submit"
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                        disabled={isSubmitting || isLoading}
                        isLoading={isSubmitting || isLoading}
                      >
                        {isSubmitting || isLoading
                          ? "Sending..."
                          : "Send Password Reset Link"}
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

            {/* Image Section */}
            <div className="flex-1 hidden lg:block">
              <img
                src={img}
                alt="Security Illustration"
                className="w-full h-auto "
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPass;
