import { RadioGroup, RadioOptionProps } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface RadioButtonProps<T> extends RadioOptionProps<"li", T> {
  className?: string;
}

export function TabLikeRadioButton<T>({
  children,
  className,
  ...props
}: RadioButtonProps<T>) {
  return (
    <RadioGroup.Option
      as="li"
      className={twMerge(
        "flex justify-center w-full py-2.5 px-5 transition-colors font-medium text-sm rounded",
        "ui-not-checked:text-text ui-checked:bg-lavender ui-checked:text-crust ui-not-checked:active:bg-surface1",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroup.Option>
  );
}
