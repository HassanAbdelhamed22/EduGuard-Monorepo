/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4D46B4",
        primaryHover: "#3e3890",
        background: "#ffffff",
        darkGray: "#3A3E45",
        lightGray: "#E9ECEF",
        borderLight: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
