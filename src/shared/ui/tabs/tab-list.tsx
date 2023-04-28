import {
  Tab as HeadlessTab,
  TabListProps as HeadlessTabListProps,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface TabListProps extends HeadlessTabListProps<"div"> {
  label?: string;
  className?: string;
  containerClassName?: string;
}

export const TabList = ({
  className,
  containerClassName,
  label,
  children,
}: TabListProps) => {
  return (
    <div
      className={twMerge(
        "flex justify-between items-center",
        containerClassName,
      )}
    >
      {label && <span className="text-h2 text-text">{label}</span>}
      <HeadlessTab.List
        as="div"
        className={twMerge("flex gap-1 p-1 bg-surface0 rounded", className)}
      >
        {children}
      </HeadlessTab.List>
    </div>
  );
};
