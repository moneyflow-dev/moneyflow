import { ForwardedRef, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface PageLayoutProps {
  hasHorizontalPaddings?: boolean;
  hasBottomPadding?: boolean;
  children?: ReactNode;
  className?: string;
}

export const PageLayout = forwardRef(function PageLayout(
  {
    children,
    className,
    hasHorizontalPaddings = true,
    hasBottomPadding = false,
  }: PageLayoutProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={twMerge(
        "flex flex-col gap-3 pt-4",
        hasHorizontalPaddings && "px-5",
        hasBottomPadding && "pb-5",
        className,
      )}
    >
      {children}
    </div>
  );
});
