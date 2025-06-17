import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "../ui/Button";
import Input from "../ui/Input";
import CustomCombobox from "../ui/Combobox";
import { CreateQuizValidationSchema } from "../../utils/validation";

const UpdateQuizForm = ({ initialValues, onSubmit, isLoading, closeModal }) => {
  return (
    <Formik
      initialValues={{
        title: initialValues?.Title || "",
        description: initialValues?.Description || "",
        quiz_date: initialValues?.QuizDate
          ? new Date(initialValues?.QuizDate).toISOString().split("T")[0]
          : "" || "",
        start_time: initialValues?.StartTime
          ? new Date(initialValues?.StartTime).toTimeString().slice(0, 5)
          : "" || "",
        end_time: initialValues?.EndTime
          ? new Date(initialValues?.EndTime).toTimeString().slice(0, 5)
          : "" || "",
      }}
      validationSchema={CreateQuizValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ errors, touched, isSubmitting, isLoading }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quiz Title
            </label>
            <Field
              type="text"
              name="title"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.title && touched.title
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.title && touched.title && (
              <div className="mt-1 text-sm text-red-600">{errors.title}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Field
              type="text"
              name="description"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.description && touched.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.description && touched.description && (
              <div className="mt-1 text-sm text-red-600">
                {errors.description}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quiz Date
            </label>
            <Field
              type="date"
              name="quiz_date"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.quiz_date && touched.quiz_date
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.quiz_date && touched.quiz_date && (
              <div className="mt-1 text-sm text-red-600">
                {errors.quiz_date}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <Field
                type="time"
                name="start_time"
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                  errors.start_time && touched.start_time
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.start_time && touched.start_time && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.start_time}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <Field
                type="time"
                name="end_time"
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                  errors.end_time && touched.end_time
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.end_time && touched.end_time && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.end_time}
                </div>
              )}
            </div>
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

export default UpdateQuizForm;
