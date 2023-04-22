import { RadioGroup } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { ColorPickerColor } from "../color-pickers";
import { Label } from "../labels";

import { ColorPickerOption } from "./color-picker-option";

interface ColorPickerOptionProps {
  value: ColorPickerColor;
  onChange(color: ColorPickerColor): void;
  label?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
}

const defaultColors: ColorPickerColor[] = [
  "yellow",
  "peach",
  "green",
  "lavender",
  "mauve",
  "blue",
  "sapphire",
  "sky",
  "teal",
  "maroon",
  "red",
  "pink",
  "flamingo",
  "rosewater",
];

export function ColorPicker({
  value,
  onChange,
  label,
  required,
  className,
  containerClassName,
}: ColorPickerOptionProps) {
  return (
    <div className={twMerge("flex flex-col gap-2", containerClassName)}>
      {label && <Label label={label} required={required} />}
      <RadioGroup
        as="ul"
        className={twMerge("flex gap-6 overflow-x-auto p-2", className)}
        value={value}
        onChange={onChange}
      >
        {defaultColors.map((color) => (
          <ColorPickerOption key={color} color={color} />
        ))}
      </RadioGroup>
    </div>
  );
}
