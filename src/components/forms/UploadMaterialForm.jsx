import { Form, Formik } from "formik";
import React from "react";
import { UploadMaterialsValidationSchema } from "../../utils/validation";
import Input from "../ui/Input";
import CustomCombobox from "../ui/Combobox";
import CustomSelect from "../ui/CustomSelect";
import Button from "../ui/Button";

const UploadMaterialForm = ({
  initialValues,
  onSubmit,
  isLoading,
  courses,
  selectedCourse,
  setSelectedCourse,
}) => {
  const materialTypeOptions = [
    { value: "pdf", label: "PDF" },
    { value: "video", label: "Video" },
    { value: "text", label: "Text" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UploadMaterialsValidationSchema}
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers);
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
            <label htmlFor="title">Material Title</label>
            <Input
              id="title"
              type="text"
              placeholder="Enter material title"
              error={!!(errors.title && touched.title)}
              {...getFieldProps("title")}
            />
            {errors.title && touched.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              type="text"
              placeholder="Material description"
              error={!!(errors.description && touched.description)}
              {...getFieldProps("description")}
            />
            {errors.description && touched.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Material Type
            </label>
            <CustomSelect
              options={materialTypeOptions}
              value={values.material_type}
              onChange={(value) => setFieldValue("material_type", value)}
              className="w-full"
            />
            {errors.material_type && touched.material_type && (
              <p className="mt-1 text-sm text-red-600">
                {errors.material_type}
              </p>
            )}
          </div>

          {/* File Field (PDF) */}
          {values.material_type === "pdf" && (
            <div>
              <label htmlFor="file">Upload PDF File</label>
              <input
                id="file"
                type="file"
                name="file"
                className="w-full border rounded-lg p-2"
                accept=".pdf,.docx,.txt,.ppt,.pptx"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    setFieldValue("file", file);
                  }
                }}
                error={!!(errors.file && touched.file)}
                //{...getFieldProps("file")}
              />
              {errors.file && touched.file && (
                <p className="mt-2 text-sm text-red-600">{errors.file}</p>
              )}
            </div>
          )}

          {/* Video Field */}
          {values.material_type === "video" && (
            <div>
              <label htmlFor="video">Upload Video</label>
              <input
                id="video"
                name="video"
                type="file"
                className="w-full border rounded-lg p-2"
                accept="video/mp4"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    setFieldValue("video", file);
                  }
                }}
              />
              {errors.video && touched.video && (
                <p className="mt-2 text-sm text-red-600">{errors.video}</p>
              )}
            </div>
          )}

          <div className="w-full">
            <label htmlFor="course_id">Select Course</label>
            <CustomCombobox
              options={courses}
              selected={selectedCourse}
              setSelected={(course) => {
                setSelectedCourse(course);
              }}
              placeholder="Choose a course"
            />
          </div>

          <Button type="submit" isLoading={isLoading || isSubmitting} fullWidth>
            {isLoading || isSubmitting ? "Updating..." : "Update Material"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadMaterialForm;
