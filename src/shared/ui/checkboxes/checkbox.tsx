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
          "p-1.25 rounded-sm transition-colors ui-checked:bg-lavender ui-not-checked:bg-surface1",
          className,
        )}
        checked={checked}
        onChange={onChange}
      >
        <CheckIcon
          size="sm"
          className="w-2.5 h-2.5 transition-transform text-crust ui-checked:scale-100 ui-not-checked:scale-0"
        />
      </Switch>
      {label && (
        <Switch.Label className={twMerge("text-text text-sm", labelClassName)}>
          {label}
        </Switch.Label>
      )}
    </Switch.Group>
  );
};
