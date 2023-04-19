import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

interface GridIconProps extends IconProps {
  topRightSquareClassName?: string;
}

export const GridIcon = ({
  size,
  className,
  topRightSquareClassName,
}: GridIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <rect width="7.11111" height="7.11111" rx="1" />
      <rect
        x="8.88889"
        width="7.11111"
        height="7.11111"
        rx="1"
        className={topRightSquareClassName}
      />
      <rect x="8.88889" y="8.88889" width="7.11111" height="7.11111" rx="1" />
      <rect y="8.88889" width="7.11111" height="7.11111" rx="1" />
    </svg>
  );
};
