import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { CheckIcon } from "../icons";

interface CheckboxProps {
  checked?: boolean;
  onChange?(checked: boolean): void;
  label?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  className,
  containerClassName,
  labelClassName,
}: CheckboxProps) => {
  return (
    <Switch.Group
      as="div"
      className={twMerge("inline-flex items-center gap-3", containerClassName)}
    >
      <Switch
        className={twMerge(
          `p-1.25 rounded-sm transition-colors ${
            checked ? "bg-lavender" : "bg-surface1"
          }`,
          className,
        )}
        checked={checked}
        onChange={onChange}
      >
        <CheckIcon
          size="small"
          className={`w-2.5 h-2.5 transition-transform text-crust ${
            checked ? "scale-100" : "scale-0"
          }`}
        />
      </Switch>
      <Switch.Label
        className={twMerge(
          "text-text text-[0.875rem]/[1.285714]",
          labelClassName,
        )}
      >
        {label}
      </Switch.Label>
    </Switch.Group>
  );
};
