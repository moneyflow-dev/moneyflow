import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CategoryCardProps {
  children?: ReactNode;
  className?: string;
}

export const CategoryCard = ({ children, className }: CategoryCardProps) => {
  return (
    <div
      className={twMerge(
        "py-4 px-6 text-text text-sm font-bold transition-colors bg-surface0 active:bg-surface1 rounded",
        className,
      )}
    >
      {children}
    </div>
  );
};
