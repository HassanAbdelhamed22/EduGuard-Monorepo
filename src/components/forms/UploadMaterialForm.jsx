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
      onSubmit={(values, helpers, { setSubmitting }) => {
        onSubmit(values, helpers, setSubmitting);
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
        <Form className="space-y-4 bg-white shadow-md rounded-lg p-6">
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
              <Input
                id="file"
                type="file"
                name="file"
                onChange={(event) =>
                  setFieldValue("file", event.currentTarget.files[0])
                }
                error={!!(errors.file && touched.file)}
                {...getFieldProps("file")}
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
              <Input
                id="video"
                type="text"
                name="video"
                onChange={(event) =>
                  setFieldValue("video", event.currentTarget.files[0])
                }
                error={!!(errors.video && touched.video)}
                {...getFieldProps("video")}
              />
              {errors.video && touched.video && (
                <p className="mt-2 text-sm text-red-600">{errors.video}</p>
              )}
            </div>
          )}

          <div>
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

          <Button type="submit" isLoading={isLoading || isSubmitting}>
            {isLoading || isSubmitting ? "Updating..." : "Update Material"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadMaterialForm;
