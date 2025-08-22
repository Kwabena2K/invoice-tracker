module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        clearpay: {
          "primary": "#00A699",
          "secondary": "#004C3F",
          "accent": "#F5A623",
          "neutral": "#3D4451",
          "base-100": "#DFF8F3",
        },
      },
      "light",
      "dark",
    ],
  },
}
