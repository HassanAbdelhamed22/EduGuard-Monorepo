import React from "react";
import { createQuestion } from "../../services/professorService";
import toast from "react-hot-toast";
import AddQuestionForm from "../../components/forms/AddQuestionForm";

const AddQuestion = () => {
  const initialValues = {
    quiz_id: "",
    content: "",
    type: "mcq", // Default to MCQ
    marks: "",
    options: ["", ""], // Default to 2 empty options for MCQ
    correct_option: "",
    image: null,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("quiz_id", values.quiz_id);
      formData.append("content", values.content);
      formData.append("type", values.type);
      formData.append("marks", values.marks);
      if (values.type === "mcq") {
        formData.append(
          "correct_option",
          values.options[values.correct_option]
        );
      } else {
        formData.append("correct_option", values.correct_option);
      }

      if (values.type === "mcq") {
        values.options.forEach((option) => {
          formData.append("options[]", option);
        });
      }

      if (values.image) {
        formData.append("image", values.image);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await createQuestion(formData);
      if (response.status === 201) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error Response:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Add Question</h2>

      <AddQuestionForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddQuestion;
