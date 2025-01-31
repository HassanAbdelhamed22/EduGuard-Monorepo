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
import { Lock, Unlock } from "lucide-react";

const UserTable = ({ users, onBlockToggle }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-/12">ID</TableHead>
          <TableHead className="w-3/12">Name</TableHead>
          <TableHead className="w-3/12">Email</TableHead>
          <TableHead className="w-1/12">Blocked</TableHead>
          <TableHead className="w-4/12">Courses</TableHead>
          <TableHead className="w-/12">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-md text-white ${
                  user.is_blocked ? "bg-red-600" : "bg-green-500"
                }`}
              >
                {user.is_blocked ? "Blocked" : "Active"}
              </span>
            </TableCell>
            <TableCell>
              {user.courses.length > 0 ? (
                <ul className="list-disc list-inside">
                  {user.courses.map((course) => (
                    <li key={course.id}>{course.name}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500">No Courses</span>
              )}
            </TableCell>
            <TableCell className='flex items-center justify-center border-none'>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => onBlockToggle(user)}
                title={user.is_blocked ? "Unblock User" : "Block User"}
              >
                {user.is_blocked ? (
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

export default UserTable;
