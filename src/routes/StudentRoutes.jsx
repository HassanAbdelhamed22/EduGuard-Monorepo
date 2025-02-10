import React from 'react'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SecureRoute from './SecureRoute';
import StudentLayout from '../layouts/StudentLayout';
import ErrorHandler from '../components/errors/ErrorHandler';
import PageNotFound from '../pages/PageNotFound';
import Dashboard from '../pages/student/Dashboard';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<SecureRoute allowedRoles={["user"]} />} errorElement={<ErrorHandler />}>
        <Route element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more student-specific routes */}

          {/* Page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default StudentRoutes