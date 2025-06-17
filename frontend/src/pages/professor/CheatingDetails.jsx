import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import Loading from "../../components/ui/Loading";
import { getCheatingLogs } from "../../services/professorService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import { Eye } from "lucide-react";

const CheatingDetails = () => {
  const { quizId, studentId } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCheatingLogs = async () => {
      try {
        setLoading(true);
        const response = await getCheatingLogs(quizId, studentId);
        const studentLogs = response.logs.filter(
          (log) => log.student_id === parseInt(studentId)
        );
        setLogs(studentLogs);
      } catch (error) {
        toast.error("Failed to fetch cheating logs.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheatingLogs();
  }, [quizId, studentId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Cheating Logs for Student {logs[0]?.student_name} in Quiz {quizId}
      </h1>
      {logs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Log ID</TableHead>
              <TableHead>Suspicious Behavior</TableHead>
              <TableHead>Detected At</TableHead>
              <TableHead>Reviewed</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.log_id}>
                <TableCell>{log.log_id}</TableCell>
                <TableCell>{log.suspicious_behavior || "N/A"}</TableCell>
                <TableCell>
                  {new Date(log.detected_at).toLocaleString()}
                </TableCell>
                <TableCell>{log.is_reviewed ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {log.image_path ? (
                    <button
                      onClick={() =>
                        setSelectedImage(
                          log.image_path.replace(
                            "http://localhost",
                            "http://127.0.0.1:8000"
                          )
                        )
                      }
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Eye size={20} />
                    </button>
                  ) : (
                    "No Image"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-10">
          No cheating logs found for this student.
        </p>
      )}

      {/* Modal to display the cheating image */}
      <Modal
        isOpen={!!selectedImage}
        closeModal={() => setSelectedImage(null)}
        title="Cheating Detection Image"
      >
        <div className="flex justify-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Cheating Detection"
              className="max-w-full h-auto max-h-[70vh] object-contain"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CheatingDetails;
