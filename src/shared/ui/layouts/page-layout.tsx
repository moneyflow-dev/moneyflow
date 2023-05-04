import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageLayoutProps {
  hasHorizontalPaddings?: boolean;
  hasBottomPadding?: boolean;
  children?: ReactNode;
  className?: string;
}

export const PageLayout = ({
  children,
  className,
  hasHorizontalPaddings = true,
  hasBottomPadding = false,
}: PageLayoutProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-3 overflow-y-auto",
        hasHorizontalPaddings && "px-5",
        hasBottomPadding && "pb-5",
        className,
      )}
    >
      {children}
    </div>
  );
};
