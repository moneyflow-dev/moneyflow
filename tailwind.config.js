/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",

      base: "var(--color-base)",
      mantle: "var(--color-mantle)",
      crust: "var(--color-crust)",

      surface0: "var(--color-surface0)",
      surface1: "var(--color-surface1)",
      surface2: "var(--color-surface2)",

      overlay0: "var(--color-overlay0)",
      overlay1: "var(--color-overlay1)",
      overlay2: "var(--color-overlay2)",

      text: "var(--color-text)",
      subtext0: "var(--color-subtext0)",
      subtext1: "var(--color-subtext1)",

      lavender: "var(--color-lavender)",
      blue: "var(--color-blue)",
      sapphire: "var(--color-sapphire)",
      sky: "var(--color-sky)",
      teal: "var(--color-teal)",
      green: "var(--color-green)",
      yellow: "var(--color-yellow)",
      peach: "var(--color-peach)",
      maroon: "var(--color-maroon)",
      red: "var(--color-red)",
      mauve: "var(--color-mauve)",
      pink: "var(--color-pink)",
      flamingo: "var(--color-flamingo)",
      rosewater: "var(--color-rosewater)",
    },
    extend: {},
  },
  plugins: [],
};
