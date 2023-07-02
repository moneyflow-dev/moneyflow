import {
  Combobox,
  ComboboxOptionProps as HeadlessComboboxOptionProps,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface ComboboxOptionProps<T> extends HeadlessComboboxOptionProps<"li", T> {
  className?: string;
}

export function ComboboxOption<T>({
  className,
  children,
  ...props
}: ComboboxOptionProps<T>) {
  return (
    <Combobox.Option
      className={twMerge(
        "py-2.5 px-4 text-text text-sm transition-colors active:bg-surface1",
        className,
      )}
      {...props}
    >
      {children}
    </Combobox.Option>
  );
}
