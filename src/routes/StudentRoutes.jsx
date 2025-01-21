import React from 'react'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SecureRoute from './SecureRoute';
import StudentLayout from '../layouts/StudentLayout';
import Dashboard from '../pages/admin/Dashboard';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<SecureRoute allowedRoles={["user"]} />}>
        <Route element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more student-specific routes */}
        </Route>
      </Route>
    </Routes>
  )
}

export default StudentRoutes