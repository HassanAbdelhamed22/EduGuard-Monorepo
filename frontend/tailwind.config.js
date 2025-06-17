/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        primaryHover: "#4338ca",
        background: "#ffffff",
        darkGray: "#111827",
        mediumGray: "#4b5563",
        lightGray: "#E9ECEF",
        borderLight: "#e5e7eb",
        muted: "#f9fafb",
        "muted-foreground": "#6b7280",
      },
    },
  },
  plugins: [],
};
