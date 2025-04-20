// tailwind.config.js
process.env.TAILWIND_DISABLE_OXIDE = "1";

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
