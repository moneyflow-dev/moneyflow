import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Label } from "../labels";

export interface RadioLikeCheckboxGroupProps {
  label?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
}

export function RadioLikeCheckboxGroup({
  children,
  className,
  containerClassName,
  label,
  required = false,
  ...props
}: RadioLikeCheckboxGroupProps) {
  return (
    <div className={twMerge("flex flex-col gap-2", containerClassName)}>
      {label && <Label label={label} required={required} />}
      <div
        className={twMerge("flex gap-2.5 overflow-x-auto", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
