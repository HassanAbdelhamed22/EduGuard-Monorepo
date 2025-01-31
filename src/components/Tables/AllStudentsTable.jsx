import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import Button from "../ui/Button";
import { Unlock } from "lucide-react";

const AllStudentsTable = ({ students, onBlockToggle }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">ID</TableHead>
          <TableHead className="w-2/12">Name</TableHead>
          <TableHead className="w-1/12">Email</TableHead>
          <TableHead className="w-1/12">Blocked</TableHead>
          <TableHead className="w-1/12">Courses</TableHead>
          <TableHead className="w-1/12">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students?.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-md text-white ${
                  student.is_blocked ? "bg-red-600" : "bg-green-500"
                }`}
              >
                {student.is_blocked ? "Blocked" : "Active"}
              </span>
            </TableCell>
            <TableCell>
              {student.courses.length > 0 ? (
                <ul className="list-disc list-inside">
                  {student.courses.map((course) => (
                    <li key={course.id}>{course.name}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500">No Courses</span>
              )}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => onBlockToggle(student.id, !student.is_blocked)}
                title={student.is_blocked ? "Unblock Student" : "Block Student"}
              >
                {student.is_blocked ? (
                  <Unlock className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-red-600" />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllStudentsTable;
