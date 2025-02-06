import { Field, Form, Formik } from "formik";
import React from "react";
import { materialsValidationSchema } from "../../utils/validation";
import Textarea from "./../ui/Textarea";
import CustomSelect from "./../ui/CustomSelect";
import Button from "../ui/Button";

const UpdateMaterialForm = ({ initialValues, closeModal, onSubmit }) => {
  const materialTypeOptions = [
    { value: "pdf", label: "PDF" },
    { value: "video", label: "Video" },
    { value: "text", label: "Text" },
  ];

  return (
    <Formik
      initialValues={{
        title: initialValues.Title || "",
        description: initialValues.Description || "",
        material_type: initialValues.MaterialType || "pdf",
        file: null,
        video: null,
      }}
      //validationSchema={materialsValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Material Type
            </label>
            <CustomSelect
              //label="Role"
              options={materialTypeOptions}
              value={values.material_type}
              onChange={(value) => setFieldValue("material_type", value)}
              className="w-full"
            />
            {errors.material_type && touched.material_type && (
              <p className="mt-1 text-sm text-red-600">{errors.material_type}</p>
            )}
          </div>

          {values.material_type === "pdf" && (
            <div>
              <label className="block font-medium">Upload PDF</label>
              <input
                type="file"
                name="file"
                className="w-full p-2 border rounded"
                accept="application/pdf"
                onChange={(event) =>
                  setFieldValue("file", event.currentTarget.files[0])
                }
              />
              {errors.file && <p className="text-red-500">{errors.file}</p>}
            </div>
          )}

          {values.material_type === "video" && (
            <div>
              <label className="block font-medium">Upload Video</label>
              <input
                type="file"
                name="video"
                className="w-full p-2 border rounded"
                accept="video/*"
                onChange={(event) =>
                  setFieldValue("video", event.currentTarget.files[0])
                }
              />
              {errors.video && <p className="text-red-500">{errors.video}</p>}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading || isSubmitting}
            >
              {isLoading || isSubmitting ? "Updating..." : "Update Material"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateMaterialForm;
