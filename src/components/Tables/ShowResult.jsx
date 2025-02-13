import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";

const ResultsTable = ({ results }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-3/12">Student Name</TableHead>
          <TableHead className="w-2/12">Score</TableHead>
          <TableHead className="w-2/12">Percentage</TableHead>
          <TableHead className="w-2/12">Passed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results?.map((result, index) => (
          <TableRow key={index}>
            <TableCell>{result.student_name || "N/A"}</TableCell>
            <TableCell>{result.score ?? "N/A"}</TableCell>
            <TableCell>{result.percentage ?? "N/A"}%</TableCell>
            <TableCell>{result.passed ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResultsTable;
