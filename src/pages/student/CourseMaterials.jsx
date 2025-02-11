import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { viewCourseMaterials } from "../../services/studentService";
import Loading from "../../components/ui/Loading";
import {
  FileText,
  Video,
  NotebookPen,
  Clock,
  Calendar,
  Search,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const CourseMaterials = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { courseName, courseCode } = location.state || {
    courseName: "Unknown Course",
    courseCode: "N/A",
  };

  const fetchMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await viewCourseMaterials(courseId);
      setMaterials(response.data.courseMaterials);
    } catch (error) {
      console.error(error);
      setError("Failed to load course materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [courseId]);

  const handleFileOpen = (material) => {
    if (!material.FilePath && !material.VideoPath) {
      console.error("No file path available");
      return;
    }

    const filePath =
      material.MaterialType === "pdf" ? material.FilePath : material.VideoPath;
    const baseUrl = "http://127.0.0.1:8000/storage/";
    const fullUrl = `${baseUrl}${filePath}`;

    window.open(fullUrl, "_blank");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  const materialTypes = [
    { type: "pdf", icon: FileText, label: "Documents", color: "red" },
    { type: "video", icon: Video, label: "Video Lectures", color: "blue" },
    { type: "text", icon: NotebookPen, label: "Study Notes", color: "yellow" },
  ];

  const filteredMaterials = materials
    .filter((material) =>
      selectedType ? material.MaterialType === selectedType : true
    )
    .filter((material) => {
      if (!searchQuery) return true;

      const searchTermLower = searchQuery.toLowerCase();
      const title = material.Title || "";

      return title.toLowerCase().includes(searchTermLower);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {courseName}
          </h1>
          <p className="text-lg text-gray-600">
            {courseCode} - Course Materials
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-3 border-[1px] border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Material Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {materialTypes.map(({ type, icon: Icon, label, color }) => {
            const count = materials.filter(
              (m) => m.MaterialType === type
            ).length;
            return (
              <button
                key={type}
                onClick={() =>
                  setSelectedType(selectedType === type ? null : type)
                }
                className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                  selectedType === type
                    ? `bg-${color}-50 border-2 border-${color}-500 shadow-lg `
                    : "bg-white border-2 border-transparent hover:border-gray-200 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {count} {count === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Materials List */}
        <div className="space-y-6">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No materials found{searchQuery ? " matching your search" : ""}
            </div>
          ) : (
            filteredMaterials.map((material) => (
              <div
                key={material.MaterialID}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg bg-${
                        material.MaterialType === "pdf"
                          ? "red"
                          : material.MaterialType === "video"
                          ? "blue"
                          : "yellow"
                      }-100`}
                    >
                      {material.MaterialType === "pdf" && (
                        <FileText className="w-6 h-6 text-red-600" />
                      )}
                      {material.MaterialType === "video" && (
                        <Video className="w-6 h-6 text-blue-600" />
                      )}
                      {material.MaterialType === "text" && (
                        <NotebookPen className="w-6 h-6 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {material.Title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {material.Description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(material.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(material.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  {(material.MaterialType === "pdf" ||
                    material.MaterialType === "video") && (
                    <Button
                      onClick={() => handleFileOpen(material)}
                      className={`min-w-[120px] ${
                        material.MaterialType === "pdf"
                          ? "bg-rose-500 hover:bg-rose-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {material.MaterialType === "pdf" ? (
                          <>
                            <FileText className="w-4 h-4" />
                            View PDF
                          </>
                        ) : (
                          <>
                            <Video className="w-4 h-4" />
                            Watch
                          </>
                        )}
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseMaterials;
