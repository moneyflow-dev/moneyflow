import {
  TabGroupProps as HeadlessTabGroupProps,
  Tab as HeadlessTab,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface TabGroupProps extends HeadlessTabGroupProps<"div"> {
  className?: string;
}

export const TabGroup = ({ className, children }: TabGroupProps) => {
  return (
    <HeadlessTab.Group
      as="div"
      className={twMerge("flex flex-col gap-4", className)}
    >
      {children}
    </HeadlessTab.Group>
  );
};
