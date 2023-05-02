import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Divider } from "@shared/ui/dividers";

import { BackButton } from "./back-button";

interface HeaderProps {
  title: string;
  backButton?: boolean;
  rightActions?: ReactNode;
  className?: string;
}

export const Header = ({
  title,
  backButton = false,
  rightActions,
  className,
}: HeaderProps) => {
  return (
    <header className={twMerge("w-full flex flex-col gap-3", className)}>
      <div className="flex items-center gap-4">
        {backButton && <BackButton />}
        <span className="text-text text-xl font-bold flex-1">{title}</span>
        <div className="flex gap-6 pe-3">{rightActions}</div>
      </div>
      <Divider />
    </header>
  );
};
