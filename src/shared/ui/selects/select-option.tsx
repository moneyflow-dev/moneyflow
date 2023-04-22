import { Listbox, ListboxOptionProps } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface SelectOptionProps<T> extends ListboxOptionProps<"li", T> {
  className?: string;
}

export function SelectOption<T>({
  className,
  children,
  ...props
}: SelectOptionProps<T>) {
  return (
    <Listbox.Option
      className={twMerge(
        "py-2.5 px-4 text-text text-sm transition-colors active:bg-surface1",
        className,
      )}
      {...props}
    >
      {children}
    </Listbox.Option>
  );
}
