import React from "react";
import { updatePassword } from "../../services/authService";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import { updatePassValidationSchema } from "../../utils/validation";
import Button from "../../components/ui/Button";

const UpdatePassword = () => {
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
      <h2 className="text-2xl font-semibold mb-6 pb-4 text-center border-b ">
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
            <div>
              <label
                htmlFor="current_password"
                className="block text-darkGray font-medium text-sm mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={values.current_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border ${
                  touched.current_password && errors.current_password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {touched.current_password && errors.current_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.current_password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="new_password"
                className="block text-darkGray font-medium text-sm mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={values.new_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border ${
                  touched.new_password && errors.new_password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {touched.new_password && errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="new_password_confirmation"
                className="block text-darkGray font-medium text-sm mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="new_password_confirmation"
                name="new_password_confirmation"
                value={values.new_password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border ${
                  touched.new_password_confirmation &&
                  errors.new_password_confirmation
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {touched.new_password_confirmation &&
                errors.new_password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.new_password_confirmation}
                  </p>
                )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;
