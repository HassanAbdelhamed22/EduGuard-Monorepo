import React from "react";
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">403 - Unauthorized</h1>
      <p className="text-lg text-gray-700 mt-4">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
