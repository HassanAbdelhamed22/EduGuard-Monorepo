import { Field, Form, Formik } from "formik";
import React from "react";
import { updateMaterialsValidationSchema } from "../../utils/validation";
import Textarea from "./../ui/Textarea";
import Button from "../ui/Button";

const UpdateMaterialForm = ({ initialValues, closeModal, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        title: initialValues?.Title || "",
        description: initialValues?.Description || "",
      }}
      validationSchema={updateMaterialsValidationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({
        errors,
        touched,
        isSubmitting,
        isLoading,
        values,
        setFieldValue,
        getFieldProps,
      }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Field
              type="text"
              name="title"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.title && touched.title
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
              {...getFieldProps("title")}
            />
            {errors.title && touched.title && (
              <div className="mt-1 text-sm text-red-600">{errors.title}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              name="description"
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.description && touched.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
              {...getFieldProps("description")}
            />
            {errors.description && touched.description && (
              <div className="mt-1 text-sm text-red-600">
                {errors.description}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading || isSubmitting}>
              {isLoading || isSubmitting ? "Updating..." : "Update Material"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateMaterialForm;
