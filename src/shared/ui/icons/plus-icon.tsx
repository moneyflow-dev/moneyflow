import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const PlusIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M9.23077 1.23077C9.23077 0.55 8.68077 0 8 0C7.31923 0 6.76923 0.55 6.76923 1.23077V6.76923H1.23077C0.55 6.76923 0 7.31923 0 8C0 8.68077 0.55 9.23077 1.23077 9.23077H6.76923V14.7692C6.76923 15.45 7.31923 16 8 16C8.68077 16 9.23077 15.45 9.23077 14.7692V9.23077H14.7692C15.45 9.23077 16 8.68077 16 8C16 7.31923 15.45 6.76923 14.7692 6.76923H9.23077V1.23077Z" />
    </svg>
  );
};
