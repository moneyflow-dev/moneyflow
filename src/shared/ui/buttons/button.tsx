import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonSize = "small" | "large";
type ButtonVariant = "solid" | "outlined" | "outlinedRed";
type VariantToClassNameFunction = (disabled: boolean) => string;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const sizeToClassName: Record<ButtonSize, string> = {
  small:
    "py-2 px-3 text-[0.75rem]/[1.3333334] font-bold outline-1 -outline-offset-1",
  large: "py-3.5 px-5 text-[1rem]/[1.25] font-bold outline-2 -outline-offset-2",
};

const variantToClassName: Record<ButtonVariant, VariantToClassNameFunction> = {
  solid: (disabled) =>
    `text-crust bg-lavender ${
      disabled ? "opacity-50" : "active:bg-lavender-active"
    }`,
  outlined: (disabled) =>
    `text-text outline outline-lavender ${
      disabled
        ? "opacity-50"
        : "active:bg-lavender-active active:outline-lavender-active active:text-crust"
    }`,
  outlinedRed: (disabled) =>
    `text-text outline outline-red ${
      disabled
        ? "opacity-50"
        : "active:bg-red-active active:outline-red-active active:text-crust"
    }`,
};

export const Button = ({
  size = "large",
  variant = "solid",
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded transition-colors",
        sizeToClassName[size],
        variantToClassName[variant](disabled),
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
