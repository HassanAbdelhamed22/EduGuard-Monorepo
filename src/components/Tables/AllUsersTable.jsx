import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Button } from "../ui/Button";
import { Pencil, Trash2, UserCog } from "lucide-react";

const AllUsersTable = ({ users, onAssignRole, onDelete, onEdit }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">ID</TableHead>
          <TableHead className="w-2/12">Name</TableHead>
          <TableHead className="w-1/12">Email</TableHead>
          <TableHead className="w-1/12">Phone</TableHead>
          <TableHead className="w-1/12">Address</TableHead>
          <TableHead className="w-1/12">Role</TableHead>
          <TableHead className="w-1/12">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size={"icon"}
                  title="Assign Role"
                  onClick={() => onAssignRole(user.id)}
                >
                  <UserCog className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    onEdit(user);
                  }}
                  title="Edit User"
                >
                  <Pencil className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(user.id)}
                  title="Delete User"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllUsersTable;
