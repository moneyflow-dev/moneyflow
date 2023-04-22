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
  small: "py-2 px-3 text-xsm font-bold outline-1 -outline-offset-1",
  large: "py-3.5 px-5 text-base font-bold outline-2 -outline-offset-2",
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
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded transition-colors inline-flex justify-center",
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
