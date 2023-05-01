import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outlined" | "outlinedRed" | "outlinedOverlay1";
type VariantToClassNameFunction = (disabled: boolean) => string;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const sizeToClassName: Record<ButtonSize, string> = {
  sm: "py-2 px-3 text-xs font-bold outline-1 -outline-offset-1",
  md: "py-3 px-4 gap-2.5 text-sm font-bold outline-2 -outline-offset-2",
  lg: "py-3.5 px-5 text-base-size font-bold outline-2 -outline-offset-2",
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
  outlinedOverlay1: (disabled) =>
    `text-overlay1 outline outline-overlay1 ${
      disabled
        ? "opacity-50"
        : "active:bg-overlay1 active:outline-overlay1 active:text-crust"
    }`,
};

export const Button = ({
  size = "lg",
  variant = "solid",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded transition inline-flex items-center justify-center",
        sizeToClassName[size],
        variantToClassName[variant](disabled),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
