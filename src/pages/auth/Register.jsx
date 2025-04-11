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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Logo />
        <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
          Login
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl w-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Form and Webcam */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800">
                  Register Now
                </h2>
                <p className="mt-1 text-gray-600">Create your account 👋</p>
              </div>

              {/* Form */}
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

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Right: Illustration */}
            <div className="hidden lg:block ">
              <img
                src={img}
                alt="Education Illustration"
                className=" object-cover rounded-r-lg"
                loading="lazy"
              />
            </div>
          </div>
          {/* Webcam Capture */}
          <div className="mt-4 w-full">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Capture Face Images
            </h3>
            <WebcamCapture onCapture={handleCapture} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
