import { RadioGroup } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { ColorPickerColor } from "./types";

const colorToClassName: Record<ColorPickerColor, string> = {
  yellow: "bg-yellow ui-checked:outline-yellow/75",
  peach: "bg-peach ui-checked:outline-peach/75",
  green: "bg-green ui-checked:outline-green/75",
  lavender: "bg-lavender ui-checked:outline-lavender/75",
  mauve: "bg-mauve ui-checked:outline-mauve/75",
  blue: "bg-blue ui-checked:outline-blue/75",
  sapphire: "bg-sapphire ui-checked:outline-sapphire/75",
  sky: "bg-sky ui-checked:outline-sky/75",
  teal: "bg-teal ui-checked:outline-teal/75",
  maroon: "bg-maroon ui-checked:outline-maroon/75",
  red: "bg-red ui-checked:outline-red/75",
  pink: "bg-pink ui-checked:outline-pink/75",
  flamingo: "bg-flamingo ui-checked:outline-flamingo/75",
  rosewater: "bg-rosewater ui-checked:outline-rosewater/75",
};

interface ColorPickerOptionProps {
  color: ColorPickerColor;
  className?: string;
}

export function ColorPickerOption({
  color,
  className,
}: ColorPickerOptionProps) {
  return (
    <RadioGroup.Option
      as="li"
      className={twMerge(
        "shrink-0 w-9 h-9 rounded-full transition-[outline]",
        "ui-checked:outline ui-checked:outline-offset-4 ui-checked:outline-4",
        colorToClassName[color],
        className,
      )}
      value={color}
    />
  );
}
