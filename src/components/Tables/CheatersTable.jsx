import React, { useState } from "react";
import { Eye, RefreshCw, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { useNavigate } from "react-router";
import ReviewAnswersModal from "../ReviewAnswersModal";

const CheatersTable = ({ results, updateCheater }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const quizId = results?.quiz_id;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Debug: log the results prop
  console.log("CheatersTable results:", results);

  const students = results?.students || [];

  const filteredResults = students.filter((student) =>
    student.student_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReviewClick = (studentId) => {
    setSelectedStudentId(studentId);
    setModalOpen(true);
  };

  const handleUpdate = (updatedResult) => {
    updateCheater(updatedResult.student_id, updatedResult.cheating_score);
  };

  if (!quizId) {
    console.error("quizId is undefined in CheatersTable props:", results);
    return (
      <p className="text-center text-red-500">Error: Quiz ID is missing.</p>
    );
  }

  return (
    <div>
      <div className="relative mb-4 max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by Student Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 border-[1px] border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg w-full"
        />
      </div>

      {students.length > 0 ? (
        filteredResults.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12">Student ID</TableHead>
                <TableHead className="w-2/12">Student Name</TableHead>
                <TableHead className="w-2/12">Student Email</TableHead>
                <TableHead className="w-2/12">Cheating Score</TableHead>
                <TableHead className="w-2/12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((student) => (
                <TableRow key={student.student_id}>
                  <TableCell>{student.student_id || "N/A"}</TableCell>
                  <TableCell>{student.student_name || "N/A"}</TableCell>
                  <TableCell>{student.student_email ?? "N/A"}</TableCell>
                  <TableCell>{student.cheating_score ?? "N/A"}</TableCell>
                  <TableCell className="flex gap-5">
                    <button
                      onClick={() =>
                        navigate(
                          `/professor/quiz/${quizId}/${student.student_id}/cheating-logs`
                        )
                      }
                      className="text-indigo-600 hover:text-indigo-800"
                      title="View Cheating Logs"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleReviewClick(student.student_id)}
                      className="text-green-600 hover:text-green-800"
                      title="Review Answers & Reset Cheating"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-lg text-gray-500 mt-10">
            No student found with this name.
          </p>
        )
      ) : (
        <p className="text-center text-lg text-gray-500 mt-10">
          No cheaters detected in this quiz.
        </p>
      )}

      {modalOpen && (
        <ReviewAnswersModal
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          studentId={selectedStudentId}
          quizId={quizId}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default CheatersTable;
