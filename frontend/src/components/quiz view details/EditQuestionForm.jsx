import React from "react";
import Button from "../ui/Button";

const EditQuestionForm = ({
  editedText,
  setEditedText,
  editedMarks,
  setEditedMarks,
  editedOptions,
  setEditedOptions,
  correctAnswer,
  setCorrectAnswer,
  handleSave,
  handleCancelEdit,
  isSaving,
}) => {
  return (
    <div>
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        placeholder="Question content"
      />

      <input
        type="number"
        className="w-full p-2 border rounded mb-2"
        value={editedMarks}
        onChange={(e) => setEditedMarks(e.target.value)}
        placeholder="Enter marks"
      />

      {editedOptions.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded mb-1"
            value={option.AnswerText}
            onChange={(e) => {
              const newOptions = [...editedOptions];
              newOptions[index].AnswerText = e.target.value;
              setEditedOptions(newOptions);
            }}
          />
          <input
            type="radio"
            name="correctAnswer"
            checked={correctAnswer === index}
            onChange={() => setCorrectAnswer(index)}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <Button onClick={handleCancelEdit} variant="cancel" fullWidth>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="default"
          fullWidth
          isLoading={isSaving}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditQuestionForm;
