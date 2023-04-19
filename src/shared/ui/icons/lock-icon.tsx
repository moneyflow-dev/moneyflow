import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const LockIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M5.5 4.5V6H10.5V4.5C10.5 3.11875 9.38125 2 8 2C6.61875 2 5.5 3.11875 5.5 4.5ZM3.5 6V4.5C3.5 2.01562 5.51562 0 8 0C10.4844 0 12.5 2.01562 12.5 4.5V6H13C14.1031 6 15 6.89687 15 8V14C15 15.1031 14.1031 16 13 16H3C1.89688 16 1 15.1031 1 14V8C1 6.89687 1.89688 6 3 6H3.5Z" />
    </svg>
  );
};
