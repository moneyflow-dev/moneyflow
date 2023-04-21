import { RadioGroup, RadioOptionProps } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface RadioButtonProps<T> extends RadioOptionProps<"li", T> {
  className?: string;
}

export function RadioButton<T>({
  children,
  className,
  ...props
}: RadioButtonProps<T>) {
  return (
    <RadioGroup.Option
      as="li"
      className={twMerge(
        "flex justify-center w-full py-2.5 px-5 transition-colors font-medium text-[0.875rem]/[1.285714] rounded",
        "ui-not-checked:text-text ui-checked:bg-lavender ui-checked:text-crust",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroup.Option>
  );
}
