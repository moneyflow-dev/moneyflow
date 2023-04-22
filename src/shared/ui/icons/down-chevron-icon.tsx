import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const DownChevronIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M7.19307 12.2375C7.63934 12.6839 8.3641 12.6839 8.81038 12.2375L15.6652 5.38035C16.1115 4.93392 16.1115 4.20892 15.6652 3.76249C15.219 3.31607 14.4942 3.31607 14.0479 3.76249L7.99994 9.8125L1.95196 3.76607C1.50568 3.31964 0.780927 3.31964 0.334648 3.76607C-0.111631 4.21249 -0.111631 4.93749 0.334648 5.38392L7.1895 12.2411L7.19307 12.2375Z" />
    </svg>
  );
};
