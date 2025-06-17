import React, { useState } from "react";
import { updatePassword } from "../../services/authService";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import { updatePassValidationSchema } from "../../utils/validation";
import Button from "../../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const initialValues = {
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const { data, status } = await updatePassword(values);

      if (status === 200) {
        toast.success("Password updated successfully");
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-white mt-20">
      <h2 className="text-2xl font-semibold mb-6 pb-4 text-center border-b">
        Update Password
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={updatePassValidationSchema}
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
            {[
              { id: "current_password", label: "Current Password", key: "current" },
              { id: "new_password", label: "New Password", key: "new" },
              { id: "new_password_confirmation", label: "Confirm New Password", key: "confirm" },
            ].map(({ id, label, key }) => (
              <div key={id} className="relative">
                <label htmlFor={id} className="block text-darkGray font-medium text-sm mb-1">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={showPassword[key] ? "text" : "password"}
                    id={id}
                    name={id}
                    value={values[id]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border-[1px] border-borderLight dark:border-borderDark shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent text-secondaryLightText dark:text-secondaryDarkText 
                    ${touched[id] && errors[id] ? "border-red-500" : "border-gray-300"} 
                    focus:border-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(key)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword[key] ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {touched[id] && errors[id] && (
                  <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                )}
              </div>
            ))}

            <Button type="submit" disabled={isSubmitting} fullWidth isLoading={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;
