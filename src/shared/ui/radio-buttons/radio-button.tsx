import { RadioGroup, RadioOptionProps } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { ColorPickerColor } from "../color-pickers";

const selectedColorToClassName: Record<ColorPickerColor, string> = {
  yellow: "ui-checked:bg-yellow",
  peach: "ui-checked:bg-peach",
  green: "ui-checked:bg-green",
  lavender: "ui-checked:bg-lavender",
  mauve: "ui-checked:bg-mauve",
  blue: "ui-checked:bg-blue",
  sapphire: "ui-checked:bg-sapphire",
  sky: "ui-checked:bg-sky",
  teal: "ui-checked:bg-teal",
  maroon: "ui-checked:bg-maroon",
  red: "ui-checked:bg-red",
  pink: "ui-checked:bg-pink",
  flamingo: "ui-checked:bg-flamingo",
  rosewater: "ui-checked:bg-rosewater",
};

interface RadioButtonProps<T> extends RadioOptionProps<"li", T> {
  selectedColor: ColorPickerColor;
  className?: string;
}

export function RadioButton<T>({
  selectedColor,
  children,
  className,
  ...props
}: RadioButtonProps<T>) {
  return (
    <RadioGroup.Option
      as="li"
      className={twMerge(
        "flex items-center gap-2.5 py-3 px-4 transition-colors font-bold text-sm rounded",
        "ui-not-checked:bg-surface0 ui-not-checked:text-overlay1",
        "ui-not-checked:active:bg-surface1 ui-checked:text-crust",
        selectedColorToClassName[selectedColor],
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroup.Option>
  );
}
