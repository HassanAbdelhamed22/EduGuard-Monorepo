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
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [capturedImages, setCapturedImages] = useState([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
  });

  const steps = ["Personal Info", "Account Security", "Identity Verification"];
  const totalSteps = steps.length;

  const handleCapture = (images) => {
    setCapturedImages(images);
  };

  const handleFormDataUpdate = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.email.trim();
      case 2:
        return (
          formData.password &&
          formData.password_confirmation &&
          formData.phone.trim()
        );
      case 3:
        return capturedImages.length > 0;
      default:
        return false;
    }
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

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
              ${
                index + 1 <= currentStep
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500"
              }
            `}
            >
              {index + 1 < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className="mt-2 text-xs text-gray-600 text-center max-w-20 font-medium">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
              flex-1 h-0.5 mx-4 mt-5 transition-all duration-300
              ${index + 1 < currentStep ? "bg-indigo-600" : "bg-gray-200"}
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
          <Logo />
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200"
          >
            Sign in
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
                <p className="text-indigo-100">
                  Join thousands of users already using our platform
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <StepIndicator />
              <ProgressBar />

              {/* Step Content */}
              <div className="mb-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="text-gray-600 mt-2">
                        Tell us a bit about yourself
                      </p>
                    </div>

                    <RegisterForm
                      initialValues={formData}
                      validationSchema={registerValidationSchema}
                      onSubmit={handleFormDataUpdate}
                      isLoading={false}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      showPasswordConfirmation={showPasswordConfirmation}
                      setShowPasswordConfirmation={setShowPasswordConfirmation}
                      step={1}
                      onDataChange={handleFormDataUpdate}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Account Security
                      </h2>
                      <p className="text-gray-600 mt-2">
                        Secure your account with a strong password
                      </p>
                    </div>

                    <RegisterForm
                      initialValues={formData}
                      validationSchema={registerValidationSchema}
                      onSubmit={handleFormDataUpdate}
                      isLoading={false}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      showPasswordConfirmation={showPasswordConfirmation}
                      setShowPasswordConfirmation={setShowPasswordConfirmation}
                      step={2}
                      onDataChange={handleFormDataUpdate}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Identity Verification
                      </h2>
                      <p className="text-gray-600 mt-2">
                        We need to capture a few photos to verify your identity
                      </p>
                    </div>

                    <WebcamCapture onCapture={handleCapture} />
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceedToNext()}
                    className={`flex items-center gap-2 ${
                      canProceedToNext()
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubmit(formData)}
                    disabled={!canProceedToNext() || isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isLoading
                      ? "Creating Account..."
                      : "Complete Registration"}
                  </Button>
                )}
              </div>

              {/* Sign in link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
