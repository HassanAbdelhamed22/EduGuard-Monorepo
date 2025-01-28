import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';

const AllUsers = () => {
  const data = [
    { name: "Apple MacBook Pro 17", color: "Silver", category: "Laptop", price: "$2999" },
    { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
  ];
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} striped>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.color}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllUsers