import { Description, Field, Label, Select } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";

export default function CustomSelect({
  label,
  description,
  options,
  className,
  value,
  onChange,
}) {
  return (
    <div className={clsx("w-full", className)}>
      <Field>
        {/* Label */}
        <Label className="block text-sm font-medium text-gray-700 ">
          {label}
        </Label>

        {/* Description (optional) */}
        {description && (
          <Description className="text-sm text-gray-500 mb-2">
            {description}
          </Description>
        )}

        {/* Select Dropdown */}
        <div className="relative">
          <Select
            className={clsx(
              "border-[1px] border-borderLight dark:border-borderDark shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
            )}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-gray-900"
              >
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </Field>
    </div>
  );
}
