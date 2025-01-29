import React, { useEffect, useState } from "react";
import { updateUserAccountValidationSchema } from "../../utils/validation";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";

const UpdateUserAccountForm = ({
  initialValues,
  onSubmit,
  isLoading,
  closeModal,
}) => {
  // const [formValues, setFormValues] = useState(initialValues);

  // useEffect(() => {
  //   setFormValues(initialValues);
  // }, [initialValues]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateUserAccountValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting, isLoading }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              type="text"
              name="name"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.name && touched.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.name && touched.name && (
              <div className="mt-1 text-sm text-red-600">{errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.email && touched.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.email && touched.email && (
              <div className="mt-1 text-sm text-red-600">{errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Field
              type="text"
              name="phone"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.phone && touched.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.phone && touched.phone && (
              <div className="mt-1 text-sm text-red-600">{errors.phone}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Field
              type="text"
              name="address"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.address && touched.address
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.address && touched.address && (
              <div className="mt-1 text-sm text-red-600">{errors.address}</div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
              isLoading={isLoading}
            >
              {isLoading || isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateUserAccountForm;
