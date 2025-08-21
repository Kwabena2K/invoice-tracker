// tailwind.config.cjs
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // optional: configure themes
    styled: true,              // enable DaisyUI component classes
    base: true,                // include base styles
    utils: true,               // include utility classes
    logs: true,                // enable console logs
  },
};
