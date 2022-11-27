/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "body": ["body"],
        "title": ["title"],
      }
    },
  },
  plugins: [require('@tailwindcss/forms')({
    strategy: 'base',
    strategy: 'class',
  })],
}
