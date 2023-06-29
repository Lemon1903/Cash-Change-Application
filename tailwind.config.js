/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*{ts,tsx}"],
  theme: {
    colors: {
      primary: "#002046",
      secondary: "#BEA000",
      output: "#FFF4D8",
      input: "#FFFFFF",
      muted: "#8F8F8F",
      border: "#000000",
    },
    fontFamily: {
      poppins: "Poppins, sans-serif",
    },
    extend: {
      fontSize: {
        "3xl": ["2rem", "2.25rem"],
      }
    },
  },
  plugins: [],
}
