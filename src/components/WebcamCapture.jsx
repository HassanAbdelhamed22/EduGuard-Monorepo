import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "./ui/Button";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const WebcamCapture = ({ onCapture }) => {
  const webCamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [instructions, setInstructions] = useState("");

  // Capture a single screenshot
  const captureScreenshot = useCallback(() => {
    const imageSrc = webCamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prev) => [...prev, imageSrc]);
      // Defer onCapture to run after state update
      setTimeout(() => onCapture([...capturedImages, imageSrc]), 0);
    }
  }, [webCamRef, onCapture, capturedImages]);

  // Start the automatic capture process
  const startCapture = useCallback(() => {
    if (capturedImages.length >= 50 || isCapturing) return; // Prevent overlap
    setIsCapturing(true);
    setInstructions(
      "Prepare for capture:\n1. Sit in a well-lit room.\n2. Center your face in the frame.\n3. Keep your eyes open and look at the camera.\n4. Focus on your face.\n5. Press the 'Capture' button."
    );
    setCountdown(5);
  }, [capturedImages.length, isCapturing]);

  // Handle countdown and automatic capture
  useEffect(() => {
    if (countdown === null || !isCapturing) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        if (countdown === 1) {
          setInstructions(
            "Capturing soon: Move your face to all positions during capture."
          );
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setInstructions(
        "Capturing images: Adjust your face (left, right, up, down) as shots are taken."
      );
      let captureCount = 0;
      const maxCaptures = 3;

      const captureInterval = setInterval(() => {
        if (captureCount < maxCaptures && capturedImages.length < 50) {
          captureScreenshot();
          captureCount++;
          if (captureCount === 1) setInstructions("Captured 1/3: Look left.");
          else if (captureCount === 2)
            setInstructions("Captured 2/3: Look right.");
          else if (captureCount === 3)
            setInstructions("Captured 3/3: Look straight.");
        } else {
          clearInterval(captureInterval);
          setIsCapturing(false);
          setInstructions("Capture complete! Review your images.");
          setTimeout(() => setInstructions(""), 3000);
          setCountdown(null);
        }
      }, 1000);

      return () => clearInterval(captureInterval);
    }
  }, [countdown, isCapturing, captureScreenshot, capturedImages.length]);

  // Reset webcam stream if needed
  const resetWebcam = useCallback(() => {
    if (webCamRef.current) {
      webCamRef.current.stream.getTracks().forEach((track) => track.stop());
      console.log("Webcam stream reset.");
    }
  }, [webCamRef]);

  // Cleanup on unmount or before new capture session
  useEffect(() => {
    return () => {
      if (isCapturing) resetWebcam();
    };
  }, [isCapturing, resetWebcam]);

  const removeImage = (index) => {
    const updatedImages = capturedImages.filter((_, i) => i !== index);
    setCapturedImages(updatedImages);
    onCapture(updatedImages);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 space-y-2">
        <Webcam
          audio={false}
          ref={webCamRef}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          className="w-full h-auto rounded-lg border border-gray-300"
        />
        <Button
          variant="default"
          onClick={startCapture}
          disabled={isCapturing || capturedImages.length >= 50}
          fullWidth
        >
          {isCapturing ? "Capturing..." : "Start Auto Capture"}
        </Button>
      </div>

      <div className="w-full md:w-1/2 space-y-2">
        {instructions && (
          <div className="text-center text-sm font-medium text-indigo-600 whitespace-pre-line bg-indigo-50 p-2 rounded">
            {instructions} {countdown > 0 && countdown}
          </div>
        )}
        <div className="max-h-[400px] overflow-y-auto grid grid-cols-3 gap-2">
          {capturedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Captured ${index}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {capturedImages.length > 0 && (
          <p className="text-center text-xs text-gray-600">
            {capturedImages.length} image(s) captured
          </p>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
