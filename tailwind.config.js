import headlessUiPlugin from "@headlessui/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",

      "base-color": "rgba(var(--color-base), <alpha-value>)",
      mantle: "rgba(var(--color-mantle), <alpha-value>)",
      crust: "rgba(var(--color-crust), <alpha-value>)",

      surface0: "rgba(var(--color-surface0), <alpha-value>)",
      "surface0-active": "rgba(var(--color-surface0-active), <alpha-value>)",
      surface1: "rgba(var(--color-surface1), <alpha-value>)",
      surface2: "rgba(var(--color-surface2), <alpha-value>)",

      overlay0: "rgba(var(--color-overlay0), <alpha-value>)",
      overlay1: "rgba(var(--color-overlay1), <alpha-value>)",
      overlay2: "rgba(var(--color-overlay2), <alpha-value>)",

      text: "rgba(var(--color-text), <alpha-value>)",
      subtext0: "rgba(var(--color-subtext0), <alpha-value>)",
      subtext1: "rgba(var(--color-subtext1), <alpha-value>)",

      lavender: "rgba(var(--color-lavender), <alpha-value>)",
      "lavender-active": "rgba(var(--color-lavender-active), <alpha-value>)",

      blue: "rgba(var(--color-blue), <alpha-value>)",
      sapphire: "rgba(var(--color-sapphire), <alpha-value>)",
      sky: "rgba(var(--color-sky), <alpha-value>)",
      teal: "rgba(var(--color-teal), <alpha-value>)",

      green: "rgba(var(--color-green), <alpha-value>)",
      "green-active": "rgba(var(--color-green-active), <alpha-value>)",

      yellow: "rgba(var(--color-yellow), <alpha-value>)",
      peach: "rgba(var(--color-peach), <alpha-value>)",
      maroon: "rgba(var(--color-maroon), <alpha-value>)",

      red: "rgba(var(--color-red), <alpha-value>)",
      "red-active": "rgba(var(--color-red-active), <alpha-value>)",

      mauve: "rgba(var(--color-mauve), <alpha-value>)",
      "mauve-active": "rgba(var(--color-mauve-active), <alpha-value>)",

      pink: "rgba(var(--color-pink), <alpha-value>)",
      flamingo: "rgba(var(--color-flamingo), <alpha-value>)",
      rosewater: "rgba(var(--color-rosewater), <alpha-value>)",
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
      xs: ["0.75rem", "1.32"],
      "body-xs": ["0.75rem", "1.75"],
      sm: ["0.875rem", "1.32"],
      base: ["1rem", "1.32"],
      h2: ["1rem", { lineHeight: "1.32", fontWeight: "700" }],
      xl: ["1.125rem", "1.32"],
    },
    extend: {
      spacing: {
        1.25: "0.3125rem",
        1.75: "0.4375rem",
      },
    },
  },
  plugins: [headlessUiPlugin],
};
