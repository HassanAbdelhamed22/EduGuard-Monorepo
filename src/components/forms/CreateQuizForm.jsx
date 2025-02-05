import React from "react";
import { Formik, Form } from "formik";
import Button from "../ui/Button";
import Input from "../ui/Input";
import CustomCombobox from "../ui/Combobox";
import { CreateQuizValidationSchema } from "../../utils/validation";

const CreateQuizForm = ({
  initialValues,
  onSubmit,
  isLoading,
  courses,
  selectedCourse,
  setSelectedCourse,
}) => {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Create New Quiz</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateQuizValidationSchema}
        onSubmit={(values, helpers) => {
          onSubmit(values, helpers);
        }}
      >
        {({ errors, touched, isSubmitting, getFieldProps }) => (
          <Form className="space-y-4 bg-white shadow-md rounded-lg p-6">
            <div>
              <label htmlFor="title">Quiz Title</label>
              <Input
                id="title"
                type="text"
                placeholder="Enter quiz title"
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
                placeholder="Quiz description"
                error={!!(errors.description && touched.description)}
                {...getFieldProps("description")}
              />
              {errors.description && touched.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quiz_date">Quiz Date</label>
                <Input
                  id="quiz_date"
                  name="quiz_date"
                  type="date"
                  {...getFieldProps("quiz_date")}
                />
              </div>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_time">Start Time</label>
                <Input
                  id="start_time"
                  name="start_time"
                  type="time"
                  {...getFieldProps("start_time")}
                />
                {errors.start_time && touched.start_time && (
                  <div className="text-red-500">{errors.start_time}</div>
                )}
              </div>
              <div>
                <label htmlFor="end_time">End Time</label>
                <Input
                  id="end_time"
                  name="end_time"
                  type="time"
                  {...getFieldProps("end_time")}
                />
                {errors.end_time && touched.end_time && (
                  <div className="text-red-500">{errors.end_time}</div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? "Creating..." : "Create Quiz"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuizForm;
