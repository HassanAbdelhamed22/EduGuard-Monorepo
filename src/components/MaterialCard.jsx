import React from "react";
import Button from "./ui/Button";

const MaterialCard = ({ material }) => {
  // Construct the full URL for the video
  const videoUrl = `http://127.0.0.1:8000${material.VideoPath}`;

  // Construct the full URL for the pdf
  const pdfUrl = `http://127.0.0.1:8000${material.FilePath}`;

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
      <h3 className="text-lg font-semibold text-gray-800">{material.Title}</h3>
      <p className="text-sm text-gray-600 mt-2">{material.Description}</p>
      <div className="mt-4 text-sm text-gray-500">
        <p>Uploaded: {new Date(material.created_at).toLocaleDateString()}</p>
        {material.MaterialType === "video" && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Watch Video
          </a>
        )}
        {material.MaterialType === "pdf" && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:underline"
          >
            View PDF
          </a>
        )}
        {material.MaterialType === "notes" && (
          <a
            href={material.FilePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:underline"
          >
            View Notes
          </a>
        )}
      </div>
      <div className="flex mt-4 gap-4">
        <Button variant="danger" fullWidth>
          Delete
        </Button>
        <Button variant="cancel" fullWidth>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default MaterialCard;
