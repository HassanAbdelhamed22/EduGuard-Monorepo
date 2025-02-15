import React from "react";
import { Filter } from "lucide-react";

const SortDropdown = ({ value, onChange, options }) => {
  return (
    <div className="relative w-full md:w-60">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Filter className="h-5 w-5 text-gray-400" />
      </div>
      <select
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 ml-3 right-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
