/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farmGreen: "#4ade80",
        farmBrown: "#92400e",
        farmSky: "#38bdf8",
      },
      fontFamily: {
        retro: ["'Press Start 2P'", "cursive"],
      },
    },
  },
  plugins: [],
}