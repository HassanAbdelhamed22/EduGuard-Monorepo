import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center rounded-md font-medium text-white duration-300 dark:text-black disabled:bg-indigo-400 disabled:hover:bg-indigo-400 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // ** FILLED
        default: "bg-primary hover:bg-primaryHover dark:text-white disabled:cursor-not-allowed",
        danger:
          "bg-red-900 dark:bg-[#c2344d] dark:text-white dark:hover:bg-red-700 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-[#c8485f] disabled:hover:bg-[#c8485f]",
        cancel:
          "bg-gray-300 text-gray-900 hover:bg-gray-400 hover:text-gray-700 disabled:bg-gray-300 disabled:text-gray-400 hover:disabled:bg-gray-300",

        // ** OUTLINE
        outline:
          "border border-indigo-400 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-indigo-600  disabled:cursor-not-allowed hover:disabled:bg-transparent disabled:bg-transparent hover:disabled:border-indigo-400 disabled:text-gray-400 hover:disabled:text-gray-400",
        ghost: "text-gray-600 hover:bg-gray-100",
      },
      size: {
        default: "p-3",
        sm: "text-sm px-4 py-2",
        icon: "h-9 w-9",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({
  variant,
  size,
  fullWidth,
  isLoading,
  className,
  children,
  type,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
