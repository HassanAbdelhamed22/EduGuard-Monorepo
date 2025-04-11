import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { saveUserData } from "../../utils/functions";
import toast from "react-hot-toast";
import img from "../../assets/auth/registerImg.svg";
import { registerValidationSchema } from "../../utils/validation";
import Logo from "../../components/Logo";
import Button from "../../components/ui/Button";
import RegisterForm from "../../components/forms/RegisterForm";
import WebcamCapture from "../../components/WebcamCapture";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [capturedImages, setCapturedImages] = useState([]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
  };

  const handleCapture = (images) => {
    setCapturedImages(images);
  };

  async function handleSubmit(values) {
    if (capturedImages.length === 0) {
      toast.error("Please capture at least one image.");
      return;
    }
    setIsLoading(true);
    try {
      const payload = { ...values, captured_images: capturedImages };
      const { data, status } = await register(payload);

      if (status === 201) {
        saveUserData(data.data);
        toast.success(
          "Registration successful, you will navigate to the login page after 2 seconds!"
        );

        setTimeout(() => {
          navigate("/login");
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
    <div className="min-h-screen bg-gray-50 flex flex-col mb-5">
      {/* Header */}
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Logo />
        <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
          Login
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Login Form */}
          <div className="space-y-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-darkGray">
                Register now!
              </h2>
              <p className="mt-2 text-mediumGray">Hi, Create your account 👋</p>
            </div>

            <RegisterForm
              initialValues={initialValues}
              validationSchema={registerValidationSchema}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showPasswordConfirmation={showPasswordConfirmation}
              setShowPasswordConfirmation={setShowPasswordConfirmation}
            />

            <div className="mt-6">
              <h3 className="text-lg font-medium text-darkGray mb-2">
                Capture Images for Face Recognition
              </h3>
              <WebcamCapture onCapture={handleCapture} />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
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

export default Register;
