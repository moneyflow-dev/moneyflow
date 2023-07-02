import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface AutocompleteProps {
  className?: string;
  children?: ReactNode;
}

export function Autocomplete({ className, children }: AutocompleteProps) {
  return <div className={twMerge("relative", className)}>{children}</div>;
}
