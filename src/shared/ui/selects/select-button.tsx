import { Listbox, ListboxButtonProps } from "@headlessui/react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { DownChevronIcon } from "../icons";

interface SelectButtonBaseProps extends ListboxButtonProps<"div"> {
  className?: string;
  children?: ReactNode;
}

interface SelectButtonWithPlaceholderProps<T> extends SelectButtonBaseProps {
  value: T;
  notSelectedValue: T;
  placeholder: string;
  className?: string;
  children?: ReactNode;
}

interface SelectButtonWithoutPlaceholderProps extends SelectButtonBaseProps {
  value?: undefined;
  notSelectedValue?: undefined;
  placeholder?: undefined;
  className?: string;
  children?: ReactNode;
}

type SelectButtonProps<T> =
  | SelectButtonWithPlaceholderProps<T>
  | SelectButtonWithoutPlaceholderProps;

/** Select button
 * @param value - selected value
 * @param notSelectedValue - if `value` equals `notSelectedValue` placeholder will be showed rather than `children`
 * @param placeholder
 * */
export function SelectButton<T>({
  value,
  notSelectedValue,
  placeholder,
  children,
  className,
  ...props
}: SelectButtonProps<T>) {
  return (
    <Listbox.Button
      as="div"
      className={twMerge(
        "flex items-center justify-between gap-2 py-3 px-4 text-text text-sm rounded bg-surface0",
        "ui-open:outline ui-open:outline-1 ui-open:-outline-offset-1 ui-open:outline-overlay0 ui-not-open:outline-none",
        "transition-colors active:bg-surface1",
        className,
      )}
      {...props}
    >
      {typeof value !== "undefined" &&
      typeof notSelectedValue !== "undefined" &&
      value === notSelectedValue ? (
        <span className="text-overlay1">{placeholder}</span>
      ) : (
        children
      )}
      <DownChevronIcon
        size="sm"
        className="text-overlay0 transition-transform ui-not-open:rotate-0 ui-open:rotate-180"
      />
    </Listbox.Button>
  );
}
