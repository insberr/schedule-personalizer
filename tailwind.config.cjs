const daisyui = require("daisyui");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [daisyui],
  daisyui: {
    themes: ["dark", "light"],
    darkTheme: "dark" // sets the dark theme for dark mode users
  }
};

module.exports = config;
