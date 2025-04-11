import React, { useCallback, useRef, useState } from "react";
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

  const capture = useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prev) => [...prev, imageSrc]);
      onCapture([...capturedImages, imageSrc]);
    }
  }, [webCamRef, setCapturedImages, onCapture]);

  const removeImage = (index) => {
    const updatedImages = capturedImages.filter((_, i) => i !== index);
    setCapturedImages(updatedImages);
    onCapture(updatedImages);
  };

  return (
    <div className="space-y-4">
      <Webcam
        audio={false}
        ref={webCamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        className="w-full h-auto rounded-lg border border-gray-300"
      />
      <div className="flex justify-center gap-4">
        <Button
          variant="default"
          onClick={capture}
          disabled={capturedImages.length >= 50}
        >
          Capture Image
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {capturedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Captured ${index}`}
              className="w-full h-24 object-cover rounded"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {capturedImages.length > 0 && (
        <p className="text-center text-sm text-gray-600">
          {capturedImages.length} image(s) captured
        </p>
      )}
    </div>
  );
};

export default WebcamCapture;
