import Button from "../../components/ui/Button";

const QuizInstructions = ({ onAcknowledge }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz Instructions</h2>
      <p className="text-gray-700 mb-4">
        Please read the following instructions carefully before starting the
        quiz:
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li>
          <strong>Webcam Monitoring</strong>: Your webcam will be active
          throughout the quiz to ensure a fair testing environment. Ensure your
          camera is on and your face is clearly visible.
        </li>
        <li>
          <strong>Cheating Detection</strong>: Our system monitors for
          suspicious behavior, such as looking away, switching tabs, or exiting
          full-screen mode. If the cheating score reaches 100, the quiz will be
          automatically submitted.
        </li>
        <li>
          <strong>Quiz Rules</strong>:
          <ul className="list-circle pl-5">
            <li>Stay in full-screen mode during the quiz.</li>
            <li>Do not use external devices, notes, or assistance.</li>
            <li>Complete the quiz within the allotted time.</li>
            <li>
              Copying, cutting, or using keyboard shortcuts (e.g., Ctrl+C) is
              disabled.
            </li>
          </ul>
        </li>
        <li>
          <strong>Technical Requirements</strong>: Ensure a stable internet
          connection and grant webcam permissions. If you encounter issues,
          contact support immediately.
        </li>
      </ul>
      <Button variant="default" onClick={onAcknowledge} className="w-full">
        I Understand, Proceed to Face Verification
      </Button>
    </div>
  );
};

export default QuizInstructions;
