import Input from "./Input";

const SearchBar = ({ value, onChange, placeholder = "Search ..." }) => {
  return (
    <div className="relative flex items-center mx-auto sm:mx-4 ">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pr-10 pl-4 py-3 border-[1px] border-borderLight dark:border-borderDark shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 absolute right-3 text-mediumGray dark:text-gray-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
