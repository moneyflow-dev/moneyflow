import {
  Combobox,
  ComboboxInputProps as HeadlessComboboxInputProps,
} from "@headlessui/react";
import { ForwardedRef, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Label } from "../labels";

export interface ComboboxInputProps<T>
  extends HeadlessComboboxInputProps<"input", T> {
  label?: string;
  required?: boolean;
  containerClassName?: string;
  leftAddonContainerClassName?: string;
  inputBoxClassName?: string;
  leftAddon?: ReactNode;
  className?: string;
}

export const ComboboxInput = forwardRef(function ComboboxInput<T>(
  {
    label,
    required = false,
    containerClassName,
    leftAddonContainerClassName,
    inputBoxClassName,
    className,
    leftAddon,
    id,
    ...props
  }: ComboboxInputProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className={twMerge("flex flex-col gap-2", containerClassName)}>
      {label && <Label label={label} required={required} htmlFor={id} />}
      <div
        className={twMerge(
          "flex gap-2 items-center py-3 px-4 rounded bg-surface0",
          inputBoxClassName,
        )}
      >
        {leftAddon && (
          <span
            className={twMerge(
              "text-sm text-overlay1 font-bold",
              leftAddonContainerClassName,
            )}
          >
            {leftAddon}
          </span>
        )}
        <Combobox.Input
          className={twMerge(
            "text-text text-sm w-full placeholder-overlay1",
            className,
          )}
          required={required}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});
