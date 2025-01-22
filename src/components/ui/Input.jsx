import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Input = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "border-[1px] border-borderLight dark:border-borderDark shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent text-secondaryLightText dark:text-secondaryDarkText",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
});

export default Input;
