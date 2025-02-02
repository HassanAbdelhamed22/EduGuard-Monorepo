import React from "react";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import { updateCourseValidationSchema } from "../../utils/validation";

const UpdateCourseForm = ({
  initialValues,
  onSubmit,
  isLoading,
  closeModal,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateCourseValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting, isLoading }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <Field
              type="text"
              name="course_name"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.course_name && touched.course_name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.course_name && touched.course_name && (
              <div className="mt-1 text-sm text-red-600">
                {errors.course_name}
              </div>
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

export default UpdateCourseForm;
