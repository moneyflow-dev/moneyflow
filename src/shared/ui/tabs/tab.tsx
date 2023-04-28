import {
  Tab as HeadlessTab,
  TabProps as HeadlessTabProps,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface TabProps extends HeadlessTabProps<"button"> {
  className?: string;
}

export const Tab = ({ className, children, ...props }: TabProps) => {
  return (
    <HeadlessTab
      className={twMerge(
        "flex py-2 px-4 transition-colors font-medium text-xs rounded",
        "ui-not-selected:text-text ui-selected:bg-lavender",
        "ui-selected:text-crust ui-not-selected:active:bg-surface1",
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessTab>
  );
};
