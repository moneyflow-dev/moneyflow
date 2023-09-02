import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return (
    <hr className={twMerge("block h-px w-full text-surface0", className)} />
  );
};
