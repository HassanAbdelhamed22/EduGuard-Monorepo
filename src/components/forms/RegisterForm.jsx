import { Formik, Form } from "formik";
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const RegisterForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
  showPassword,
  setShowPassword,
  showPasswordConfirmation,
  setShowPasswordConfirmation,
  step = 1,
  onDataChange,
}) => {
  const handleFieldChange = (field, value, setFieldValue) => {
    setFieldValue(field, value);
    if (onDataChange) {
      onDataChange({ [field]: value });
    }
  };

  const getStepFields = () => {
    switch (step) {
      case 1:
        return ["name", "email", "address"];
      case 2:
        return ["password", "password_confirmation", "phone"];
      default:
        return [
          "name",
          "email",
          "password",
          "password_confirmation",
          "phone",
          "address",
        ];
    }
  };

  const stepFields = getStepFields();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting, getFieldProps, setFieldValue }) => (
        <Form className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    error={!!(errors.name && touched.name)}
                    {...getFieldProps("name")}
                    onChange={(e) =>
                      handleFieldChange("name", e.target.value, setFieldValue)
                    }
                    className="pl-10 py-3 text-base"
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    error={!!(errors.email && touched.email)}
                    {...getFieldProps("email")}
                    onChange={(e) =>
                      handleFieldChange("email", e.target.value, setFieldValue)
                    }
                    className="pl-10 py-3 text-base"
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    error={!!(errors.address && touched.address)}
                    {...getFieldProps("address")}
                    onChange={(e) =>
                      handleFieldChange(
                        "address",
                        e.target.value,
                        setFieldValue
                      )
                    }
                    className="pl-10 py-3 text-base"
                  />
                </div>
                {errors.address && touched.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    error={!!(errors.password && touched.password)}
                    {...getFieldProps("password")}
                    onChange={(e) =>
                      handleFieldChange(
                        "password",
                        e.target.value,
                        setFieldValue
                      )
                    }
                    className="pl-10 pr-10 py-3 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password_confirmation"
                    type={showPasswordConfirmation ? "text" : "password"}
                    placeholder="Confirm your password"
                    error={
                      !!(
                        errors.password_confirmation &&
                        touched.password_confirmation
                      )
                    }
                    {...getFieldProps("password_confirmation")}
                    onChange={(e) =>
                      handleFieldChange(
                        "password_confirmation",
                        e.target.value,
                        setFieldValue
                      )
                    }
                    className="pl-10 pr-10 py-3 text-base"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                  >
                    {showPasswordConfirmation ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation &&
                  touched.password_confirmation && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password_confirmation}
                    </p>
                  )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    error={!!(errors.phone && touched.phone)}
                    {...getFieldProps("phone")}
                    onChange={(e) =>
                      handleFieldChange("phone", e.target.value, setFieldValue)
                    }
                    className="pl-10 py-3 text-base"
                  />
                </div>
                {errors.phone && touched.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
