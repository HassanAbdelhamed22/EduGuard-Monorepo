import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { addQuestionValidationSchema } from "../../utils/validation";
import Input from "../ui/Input";
import Textarea from "./../ui/Textarea";
import CustomSelect from "../ui/CustomSelect";
import Button from "../ui/Button";
import { getAllQuizzes } from "../../services/professorService";
import toast from "react-hot-toast";

const AddQuestionForm = ({ initialValues, onSubmit, isLoading }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const { quizzes } = await getAllQuizzes();
      setQuizzes(quizzes);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const quizOptions = quizzes.map((quiz) => ({
    value: quiz.QuizID,
    label: `${quiz.CourseName} - ${quiz.Title}`,
  }));

  const questionTypeOptions = [
    { value: "mcq", label: "Multiple Choice Question" },
    { value: "true_false", label: "True/False Question" },
  ];
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={addQuestionValidationSchema}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="space-y-4">
          {/* Quiz ID */}
          <div>
            <label
              htmlFor="quiz_id"
              className="block text-sm font-medium text-gray-700"
            >
              Quiz
            </label>
            <CustomSelect  
              options={quizOptions}
              value={values.quiz_id}
              onChange={(value) => setFieldValue("quiz_id", value)}
              isLoading={loading}
              placeholder="Select a quiz"
            />
            <ErrorMessage
              name="quiz_id"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Question Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Question Content
            </label>
            <Field
              as={Input}
              name="content"
              type="text"
              placeholder="Enter question content"
            />
            <ErrorMessage
              name="content"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Question Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Question Type
            </label>
            <CustomSelect
              options={questionTypeOptions}
              value={values.type}
              onChange={(value) => setFieldValue("type", value)}
            />
            <ErrorMessage
              name="type"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Marks */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marks
            </label>
            <Field
              as={Input}
              type="number"
              name="marks"
              placeholder="Enter marks"
            />
            <ErrorMessage
              name="marks"
              component="div"
              className="text-sm text-red-600"
            />
          </div>

          {/* Options for MCQ */}
          {values.type === "mcq" && (
            <div>
              <label
                htmlFor="options"
                className="block text-sm font-medium text-gray-700"
              >
                Options
              </label>
              {values.options.map((_, index) => (
                <div key={index} className="mb-2">
                  <Field
                    as={Input}
                    name={`options.${index}`}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                  />
                  <ErrorMessage
                    name={`options.${index}`}
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant={"outline"}
                onClick={() =>
                  setFieldValue("options", [...values.options, ""])
                }
              >
                Add Option
              </Button>
            </div>
          )}

          {/* Correct Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correct Option
            </label>
            {values.type === "mcq" ? (
              <CustomSelect
                options={values.options.map((option, index) => ({
                  value: index,
                  label: option,
                }))}
                value={values.correct_option}
                onChange={(value) => setFieldValue("correct_option", value)}
              />
            ) : (
              <CustomSelect
                options={[
                  { value: "true", label: "True" },
                  { value: "false", label: "False" },
                ]}
                value={values.correct_option}
                onChange={(value) => setFieldValue("correct_option", value)}
              />
            )}
            <ErrorMessage
              name="correct_option"
              component="div"
              className="text-sm text-red-600"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image (Optional)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              placeholder="Upload an image"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              className="border-[1px] border-borderLight dark:border-borderDark shadow-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-3 text-md w-full bg-background text-darkGray placeholder-mediumGray"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-sm text-red-600"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isSubmitting || isLoading}
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Submitting..." : "Add Question"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddQuestionForm;
