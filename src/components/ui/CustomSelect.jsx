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
    <div className={clsx("w-full max-w-md px-4", className)}>
      <Field>
        {/* Label */}
        <Label className="text-sm font-medium text-white">{label}</Label>

        {/* Description (optional) */}
        {description && (
          <Description className="text-sm text-white/50">{description}</Description>
        )}

        {/* Select Dropdown */}
        <div className="relative">
          <Select
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              "*:text-black"
            )}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          {/* Chevron Icon */}
          <ChevronDownIcon
            className="absolute top-2.5 right-2.5 size-4 fill-white/60 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
}
