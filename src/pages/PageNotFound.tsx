import React from "react";
import { Link } from "react-router-dom";
import { getHomePath } from "../utils/functions";

const PageNotFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-primary text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center  md:text-3xl">
              <span className="text-red-500">Oops!</span>{" "}
              <span>Page not found</span>
            </p>
            <p className="mb-8 text-center md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <Link
              to={getHomePath()}
              className="inline-block bg-primary hover:bg-primaryHover text-white p-2 hover:!text-white rounded-md"
              reloadDocument
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
