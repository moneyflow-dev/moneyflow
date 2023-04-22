import { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Label } from "../labels";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  containerClassName?: string;
  leftAddonContainerClassName?: string;
  inputBoxClassName?: string;
  leftAddon?: ReactNode;
}

/** Input
 * @param label - label text. If not provided label will not be showed
 * @param required - show * in the label
 * @param containerClassName - className for label and input container
 * @param inputBoxClassName - className for container that contains `leftAddon` and input element
 * @param inputClassName - className for input element
 * @param leftAddon - element to the left of the input
 * */
export const Input = ({
  label,
  required = false,
  containerClassName,
  leftAddonContainerClassName,
  inputBoxClassName,
  className,
  leftAddon,
  id,
  ...props
}: InputProps) => {
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
        <input
          className={twMerge(
            "text-text text-sm w-full placeholder-overlay1",
            className,
          )}
          required={required}
          id={id}
          {...props}
        />
      </div>
    </div>
  );
};
