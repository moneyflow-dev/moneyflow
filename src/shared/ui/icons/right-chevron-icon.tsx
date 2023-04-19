import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const RightChevronIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M12.2374 8.80687C12.6839 8.36059 12.6839 7.63584 12.2374 7.18956L5.38031 0.33471C4.93388 -0.11157 4.20888 -0.11157 3.76245 0.33471C3.31602 0.780989 3.31602 1.50575 3.76245 1.95203L9.81245 8L3.76602 14.048C3.31959 14.4943 3.31959 15.219 3.76602 15.6653C4.21245 16.1116 4.93745 16.1116 5.38388 15.6653L12.241 8.81044L12.2374 8.80687Z" />
    </svg>
  );
};
