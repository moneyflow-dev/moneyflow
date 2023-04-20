import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const UpArrowIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M8.73171 0.334841C8.32602 -0.111613 7.66719 -0.111613 7.2615 0.334841L2.06873 6.04945C1.66304 6.4959 1.66304 7.22094 2.06873 7.66739C2.47441 8.11385 3.13325 8.11385 3.53893 7.66739L6.95967 3.89933L6.95967 14.8571C6.95967 15.4893 7.42378 16 7.99823 16C8.57268 16 9.03678 15.4893 9.03678 14.8571L9.03678 3.9029L12.4575 7.66382C12.8632 8.11027 13.522 8.11027 13.9277 7.66382C14.3334 7.21737 14.3334 6.49233 13.9277 6.04587L8.73495 0.331269L8.73171 0.334841Z" />
    </svg>
  );
};
