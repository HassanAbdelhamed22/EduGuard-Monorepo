import React from "react";
import { Formik, Form } from "formik";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { courseValidationSchema } from "../../utils/validation";

const CreateCourseForm = ({
  initialValues,
  onSubmit,
  isLoading,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={courseValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, getFieldProps }) => (
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="CourseCode"
              className="block text-sm font-medium text-gray-700"
            >
              Course Code
            </label>
            <Input
              id="CourseCode"
              type="text"
              placeholder="Enter course code"
              error={!!(errors.CourseCode && touched.CourseCode)}
              {...getFieldProps("CourseCode")}
            />
            {errors.CourseCode && touched.CourseCode && (
              <p className="mt-2 text-sm text-red-600">{errors.CourseCode}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="CourseName"
              className="block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <Input
              id="CourseName"
              type="text"
              placeholder="Enter course name"
              error={!!(errors.CourseName && touched.CourseName)}
              {...getFieldProps("CourseName")}
            />
            {errors.CourseName && touched.CourseName && (
              <p className="mt-2 text-sm text-red-600">{errors.CourseName}</p>
            )}
          </div>

          <Button type="submit" fullWidth isLoading={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Creating..." : "Create Course"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCourseForm;
