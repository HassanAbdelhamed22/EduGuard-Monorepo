import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "./ui/Button";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const VerifyFace = ({ onCapture, disabled = false }) => {
  const webCamRef = useRef(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [instructions, setInstructions] = useState(
    "Please center your face in the frame for verification."
  );
  const [webcamReady, setWebcamReady] = useState(false);

  // Capture a single screenshot
  const captureScreenshot = useCallback(() => {
    const imageSrc = webCamRef.current?.getScreenshot();

    if (imageSrc) {
      setIsVerifying(true);
      // Extract base64 data part (remove the data URL prefix if present)
      const base64Data = imageSrc.split(',')[1] || imageSrc;
      onCapture(base64Data);
    } else {
      setInstructions("Error capturing image. Please try again.");
    }
  }, [webCamRef, onCapture]);

  // Reset webcam stream
  const resetWebcam = useCallback(() => {
    if (webCamRef.current) {
      webCamRef.current.stream.getTracks().forEach((track) => track.stop());
      console.log("Webcam stream reset.");
    }
  }, [webCamRef]);

  // Check if webcam is ready
  useEffect(() => {
    const checkWebcam = () => {
      if (webCamRef.current) {
        setWebcamReady(true);
      } else {
        setInstructions("Waiting for webcam to initialize...");
      }
    };
    checkWebcam();
  }, [webCamRef]);

  // Cleanup on unmount
  useEffect(() => {
    return () => resetWebcam();
  }, [resetWebcam]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-lg mx-auto">
      <Webcam
        audio={false}
        ref={webCamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        className="w-full h-auto rounded-lg border border-gray-300"
        onUserMedia={() => setWebcamReady(true)} // Webcam is ready when stream starts
        onUserMediaError={() => {
          setInstructions("Webcam access denied or unavailable. Please allow access.");
          setWebcamReady(false);
        }}
      />
      {instructions && (
        <div className="text-center text-sm font-medium text-indigo-600 whitespace-pre-line bg-indigo-50 p-2 rounded">
          {instructions}
        </div>
      )}
      <Button
        onClick={captureScreenshot}
        disabled={isVerifying || !webcamReady || disabled}
        fullWidth
        variant="default"
      >
        {isVerifying ? "Verifying..." : "Start Quiz"}
      </Button>
    </div>
  );
};

export default VerifyFace;
