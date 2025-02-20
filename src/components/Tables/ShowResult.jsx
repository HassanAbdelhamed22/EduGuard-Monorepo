import React, { useState } from "react";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";

const getGrade = (percentage) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 85) return "A";
  if (percentage >= 80) return "B+";
  if (percentage >= 75) return "B";
  if (percentage >= 70) return "C+";
  if (percentage >= 65) return "C";
  if (percentage >= 60) return "D+";
  if (percentage >= 50) return "D";
  return "F";
};

const ResultsTable = ({ results }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = results?.filter((result) =>
    result.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by Student Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 border-[1px] border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg w-full"
        />
      </div>

      {filteredResults.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-3/12">Student Name</TableHead>
              <TableHead className="w-2/12">Score</TableHead>
              <TableHead className="w-2/12">Percentage</TableHead>
              <TableHead className="w-2/12">Grade</TableHead>
              <TableHead className="w-2/12">Passed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.student_name || "N/A"}</TableCell>
                <TableCell>{result.score ?? "N/A"}</TableCell>
                <TableCell>{result.percentage ?? "N/A"}%</TableCell>
                <TableCell>{result.percentage !== undefined ? getGrade(result.percentage) : "N/A"}</TableCell>
                <TableCell>{result.passed ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg  text-gray-500">No student found with this name.</p>
      )}
    </div>
  );
};

export default ResultsTable;
