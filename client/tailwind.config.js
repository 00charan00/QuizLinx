/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'colour1': '#32012F',
        'colour2': '#524C42',
        'colour3': '#E2DFD0',
        'colour4': '#F97300',
      },
    }
  },
  // plugins: [require("daisyui")],
}
