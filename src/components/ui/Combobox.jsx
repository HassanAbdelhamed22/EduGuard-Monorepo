import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const CustomCombobox = ({
  options,
  selected,
  setSelected,
  placeholder = "Select an option...",
}) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="relative w-52">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "border-[1px] border-borderLight dark:border-borderDark shadow-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-3 text-md w-full bg-background text-darkGray placeholder-mediumGray"
            )}
            displayValue={(option) => option?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 text-mediumGray group-data-[hover]:text-primary" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-lg border border-borderLight bg-background p-1 [--anchor-gap:var(--spacing-1)] empty:invisible shadow-lg",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg py-2 px-3 select-none data-[focus]:bg-lightGray"
            >
              <CheckIcon className="invisible size-4 text-primary group-data-[selected]:visible" />
              <div className="text-sm text-darkGray group-data-[selected]:text-primary">
                {option.name}
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export default CustomCombobox;