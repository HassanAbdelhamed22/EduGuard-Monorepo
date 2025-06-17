import React from "react";
import { Checkbox } from "@headlessui/react";

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      className="group block size-5 rounded border bg-gray-100 data-[checked]:bg-primary cursor-pointer"
    >
      {/* Checkmark icon */}
      <svg
        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Checkbox>
  );
};

export default CustomCheckbox;
