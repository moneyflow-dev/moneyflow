import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface ToggleProps {
  checked: boolean;
  onChange?(checked: boolean): void;
  className?: string;
  circleClassName?: string;
}

export const Toggle = ({
  checked,
  onChange,
  className,
  circleClassName,
}: ToggleProps) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={twMerge(
        "flex p-1 w-10 rounded-full transition ui-not-checked:bg-surface0 ui-checked:bg-surface1",
        className,
      )}
    >
      <span
        className={twMerge(
          "rounded-full w-5 h-5 transition ui-not-checked:bg-surface1 ui-checked:bg-lavender ui-not-checked:translate-x-0 ui-checked:translate-x-full",
          circleClassName,
        )}
      ></span>
    </Switch>
  );
};
