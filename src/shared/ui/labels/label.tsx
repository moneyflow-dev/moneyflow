import { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
  required?: boolean;
}

export const Label = ({
  label,
  className,
  required = false,
  ...props
}: LabelProps) => {
  return (
    <label
      className={twMerge(
        "flex items-center gap-2 text-text text-[0.75rem]/[1.33334] font-bold ml-4",
        className,
      )}
      {...props}
    >
      {label}
      {required ? <sup className="text-maroon">*</sup> : null}
    </label>
  );
};
