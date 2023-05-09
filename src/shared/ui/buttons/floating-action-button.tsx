import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type FloatingActionButtonSize = "md" | "lg";
type FloatingActionButtonVariant =
  | "solid"
  | "solidRed"
  | "solidGreen"
  | "solidMauve";
type VariantToClassNameFunction = (disabled: boolean) => string;

interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FloatingActionButtonSize;
  variant?: FloatingActionButtonVariant;
  title?: string;
  titleClassName?: string;
  containerClassName?: string;
}

const sizeToClassName: Record<FloatingActionButtonSize, string> = {
  md: "p-[1.0625rem]",
  lg: "p-5",
};

const variantToClassName: Record<
  FloatingActionButtonVariant,
  VariantToClassNameFunction
> = {
  solid: (disabled) =>
    `text-crust bg-lavender ${
      disabled ? "opacity-50" : "active:bg-lavender-active"
    } drop-shadow-floating-action-button-lavender`,
  solidRed: (disabled) =>
    `text-crust bg-red ${
      disabled ? "opacity-50" : "active:bg-red-active"
    } drop-shadow-floating-action-button-red`,
  solidGreen: (disabled) =>
    `text-crust bg-green ${
      disabled ? "opacity-50" : "active:bg-green-active"
    } drop-shadow-floating-action-button-green`,
  solidMauve: (disabled) =>
    `text-crust bg-mauve ${
      disabled ? "opacity-50" : "active:bg-mauve-active"
    } drop-shadow-floating-action-button-mauve`,
};

export const FloatingActionButton = ({
  size = "lg",
  variant = "solid",
  disabled = false,
  title,
  titleClassName,
  containerClassName,
  className,
  children,
  ...props
}: FloatingActionButtonProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-2",
        containerClassName,
      )}
    >
      <button
        className={twMerge(
          "rounded-full transition-colors",
          sizeToClassName[size],
          variantToClassName[variant](disabled),
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
      {title && (
        <span
          className={twMerge(
            "text-xs text-text font-bold w-min text-center",
            titleClassName,
          )}
        >
          {title}
        </span>
      )}
    </div>
  );
};
