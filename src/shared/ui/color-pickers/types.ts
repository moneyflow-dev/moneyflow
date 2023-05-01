export const ColorPickerColor = {
  yellow: "yellow",
  peach: "peach",
  green: "green",
  lavender: "lavender",
  mauve: "mauve",
  blue: "blue",
  sapphire: "sapphire",
  sky: "sky",
  teal: "teal",
  maroon: "maroon",
  red: "red",
  pink: "pink",
  flamingo: "flamingo",
  rosewater: "rosewater",
} as const;

export type ColorPickerColor =
  (typeof ColorPickerColor)[keyof typeof ColorPickerColor];
