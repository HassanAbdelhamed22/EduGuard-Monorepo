import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "./ui/Button";
import { AlertCircle, Camera, Check, X } from "lucide-react";

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
  const [currentPose, setCurrentPose] = useState(0);

  // Extended poses array for 50 images
  const poses = Array.from({ length: 50 }, (_, index) => {
    const cycle = index % 5; // Cycle through 5 base poses
    const variation = Math.floor(index / 5) + 1; // Add variation number
    const basePoses = [
      {
        instruction: `Look straight at the camera (Pose ${variation})`,
        icon: "📸",
      },
      {
        instruction: `Turn your head slightly to the left (Pose ${variation})`,
        icon: "👈",
      },
      {
        instruction: `Turn your head slightly to the right (Pose ${variation})`,
        icon: "👉",
      },
      {
        instruction: `Tilt your head up slightly (Pose ${variation})`,
        icon: "⬆️",
      },
      {
        instruction: `Tilt your head down slightly (Pose ${variation})`,
        icon: "⬇️",
      },
    ];
    return basePoses[cycle];
  });

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
    if (capturedImages.length >= 50 || isCapturing) return; // Updated to 50
    setIsCapturing(true);
    setCurrentPose(0);
    setInstructions(
      "Get ready! Position yourself in good lighting and center your face."
    );
    setCountdown(3);
  }, [capturedImages.length, isCapturing]);

  // Handle countdown and automatic capture
  useEffect(() => {
    if (countdown === null || !isCapturing) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setInstructions(poses[currentPose].instruction);

      // Capture after showing instruction
      setTimeout(() => {
        captureScreenshot();
        // Check length after capturing to account for async state update
        setTimeout(() => {
          if (capturedImages.length < 50) {
            setCurrentPose((prev) => (prev + 1) % poses.length);
            setCountdown(1);
          } else {
            // All 50 images captured
            setIsCapturing(false);
            setInstructions("Perfect! All 50 photos captured successfully.");
            setTimeout(() => setInstructions(""), 3000);
            setCountdown(null);
          }
        }, 0); // Defer length check to ensure state is updated
      }, 1000);
    }
  }, [
    countdown,
    isCapturing,
    currentPose,
    captureScreenshot,
    capturedImages.length,
  ]);

  // Reset webcam stream if needed
  const resetWebcam = useCallback(() => {
    if (webCamRef.current) {
      webCamRef.current.stream.getTracks().forEach((track) => track.stop());
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
    <div className="space-y-6">
      {/* Instructions Banner */}
      {instructions && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {isCapturing && currentPose < poses.length
                ? poses[currentPose].icon
                : "ℹ️"}
            </div>
            <div>
              <p className="text-indigo-800 font-medium">{instructions}</p>
              {countdown !== null && countdown > 0 && (
                <p className="text-indigo-600 text-sm mt-1">
                  Starting in {countdown} seconds...
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Webcam Section */}
        <div className="space-y-4">
          <div className="relative">
            <Webcam
              audio={false}
              ref={webCamRef}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
              className="w-full rounded-xl border-2 border-gray-200 shadow-lg"
            />

            {/* Countdown Overlay */}
            {countdown !== null && countdown > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl">
                <div className="text-white text-center">
                  <div className="text-6xl font-bold mb-2">{countdown}</div>
                  <p className="text-lg">Get ready...</p>
                </div>
              </div>
            )}

            {/* Capturing Overlay */}
            {isCapturing && countdown === 0 && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center rounded-xl">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="default"
              onClick={startCapture}
              disabled={isCapturing || capturedImages.length >= 50} // Updated to 50
              fullWidth
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Camera className="w-5 h-5" />
              {isCapturing ? "Capturing..." : "Start Photo Capture"}
            </Button>

            {capturedImages.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setCapturedImages([]);
                  onCapture([]);
                  resetWebcam();
                }}
                disabled={isCapturing}
                className="px-4"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Captured Images Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">
              Captured Photos ({capturedImages.length}/50) {/* Updated to 50 */}
            </h4>
            {capturedImages.length >= 50 && (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            )}
          </div>

          {capturedImages.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium mb-2">
                No photos captured yet
              </p>
              <p className="text-sm text-gray-400">
                Click "Start Photo Capture" to begin the verification process
              </p>
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto rounded-lg">
              <div className="grid grid-cols-5 gap-3">
                {" "}
                {/* Updated to 5 columns for more images */}
                {Array.from({ length: 50 }).map(
                  (
                    _,
                    index // Updated to 50
                  ) => (
                    <div
                      key={index}
                      className={`
                    aspect-square rounded-lg border-2 relative
                    ${
                      capturedImages[index]
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-gray-50 border-dashed"
                    }
                  `}
                    >
                      {capturedImages[index] ? (
                        <>
                          <img
                            src={capturedImages[index]}
                            alt={`Captured ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-400">
                              {poses[index]?.instruction
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-blue-900 mb-2">
                  Photo Requirements
                </h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure good lighting on your face</li>
                  <li>• Avoid wearing glasses</li>
                  <li>• Avoid wearing hats</li>
                  <li>• Center your face in the frame</li>
                  <li>• Capture 50 different poses</li> {/* Updated to 50 */}
                  <li>• No filters or heavy makeup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
