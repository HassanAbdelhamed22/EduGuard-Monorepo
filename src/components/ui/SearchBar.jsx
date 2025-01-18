import Input from "./Input";

const SearchBar = ({ value, onChange, placeholder = "Search ..." }) => {
  return (
    <div className="relative flex items-center mx-auto sm:mx-4 mt-20 mb-10">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-4 pl-4 pr-10 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigoLight dark:focus:ring-indigoDark transition-transform duration-300 ease-in-out transform focus:scale-105 bg-inherit placeholder:text-gray-600 dark:placeholder:text-gray-300"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 absolute right-3 text-gray-600 dark:text-gray-300"
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
