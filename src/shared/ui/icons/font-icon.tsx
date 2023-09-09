import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const FontIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M9.07143 0.742857C8.90357 0.296429 8.475 0 8 0C7.525 0 7.09643 0.296429 6.92857 0.742857L2.06429 13.7143H1.14286C0.510714 13.7143 0 14.225 0 14.8571C0 15.4893 0.510714 16 1.14286 16H4.57143C5.20357 16 5.71429 15.4893 5.71429 14.8571C5.71429 14.225 5.20357 13.7143 4.57143 13.7143H4.50714L5.15 12H10.85L11.4929 13.7143H11.4286C10.7964 13.7143 10.2857 14.225 10.2857 14.8571C10.2857 15.4893 10.7964 16 11.4286 16H14.8571C15.4893 16 16 15.4893 16 14.8571C16 14.225 15.4893 13.7143 14.8571 13.7143H13.9357L9.07143 0.742857ZM9.99286 9.71429H6.00714L8 4.39643L9.99286 9.71429Z" />
    </svg>
  );
};
