import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: colors.red,
        blue: colors.blue,
        green: colors.green,
        brand: "#ff6600",
      },
    },
  },
  plugins: [],
};
