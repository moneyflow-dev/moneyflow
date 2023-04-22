import headlessUiPlugin from "@headlessui/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",

      "base-color": "var(--color-base)",
      mantle: "var(--color-mantle)",
      crust: "var(--color-crust)",

      surface0: "var(--color-surface0)",
      "surface0-active": "var(--color-surface0-active)",
      surface1: "var(--color-surface1)",
      surface2: "var(--color-surface2)",

      overlay0: "var(--color-overlay0)",
      overlay1: "var(--color-overlay1)",
      overlay2: "var(--color-overlay2)",

      text: "var(--color-text)",
      subtext0: "var(--color-subtext0)",
      subtext1: "var(--color-subtext1)",

      lavender: "var(--color-lavender)",
      "lavender-active": "var(--color-lavender-active)",

      blue: "var(--color-blue)",
      sapphire: "var(--color-sapphire)",
      sky: "var(--color-sky)",
      teal: "var(--color-teal)",

      green: "var(--color-green)",
      "green-active": "var(--color-green-active)",

      yellow: "var(--color-yellow)",
      peach: "var(--color-peach)",
      maroon: "var(--color-maroon)",

      red: "var(--color-red)",
      "red-active": "var(--color-red-active)",

      mauve: "var(--color-mauve)",
      "mauve-active": "var(--color-mauve-active)",

      pink: "var(--color-pink)",
      flamingo: "var(--color-flamingo)",
      rosewater: "var(--color-rosewater)",
    },
    borderRadius: {
      sm: "0.375rem",
      DEFAULT: "0.675rem",
      full: "9999px",
    },
    dropShadow: {
      "floating-action-button-lavender":
        "0px 2px 40px rgba(183, 189, 248, 0.3)",
      "floating-action-button-red": "0px 2px 40px rgba(238, 153, 160, 0.3)",
      "floating-action-button-green": "0px 2px 40px rgba(166, 218, 149, 0.3)",
      "floating-action-button-mauve": "0px 2px 40px rgba(198, 160, 246, 0.3)",
    },
    fontSize: {
      xsm: ["0.75rem", "1.32"],
      sm: ["0.875rem", "1.32"],
      base: ["1rem", "1.32"],
    },
    extend: {
      spacing: {
        1.25: "0.3125rem",
      },
    },
  },
  plugins: [headlessUiPlugin],
};
