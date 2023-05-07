import { Listbox, ListboxProps } from "@headlessui/react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Label } from "../labels";

export interface SelectProps<T, K> extends ListboxProps<"div", T, K> {
  label?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
}

export function Select<T, K>({
  label,
  required,
  children,
  className,
  containerClassName,
  ...props
}: SelectProps<T, K>) {
  return (
    <Listbox
      as="div"
      className={twMerge("flex flex-col gap-2", containerClassName)}
      {...props}
    >
      {label && <Label label={label} required={required} />}
      <div className={twMerge("relative", className)}>{children}</div>
    </Listbox>
  );
}
