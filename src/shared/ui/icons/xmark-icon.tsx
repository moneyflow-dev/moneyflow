import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const XmarkIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5227 2.72872C16.1475 2.10401 16.1475 1.08948 15.5227 0.464777C14.898 -0.15993 13.8835 -0.15993 13.2588 0.464777L7.99628 5.73231L2.72875 0.469774C2.10404 -0.154933 1.08951 -0.154933 0.464807 0.469774C-0.1599 1.09448 -0.1599 2.10901 0.464807 2.73371L5.73234 7.99625L0.469805 13.2638C-0.154902 13.8885 -0.154902 14.903 0.469805 15.5277C1.09451 16.1524 2.10904 16.1524 2.73374 15.5277L7.99628 10.2602L13.2638 15.5227C13.8885 16.1474 14.903 16.1474 15.5277 15.5227C16.1525 14.898 16.1525 13.8835 15.5277 13.2588L10.2602 7.99625L15.5227 2.72872Z" />
    </svg>
  );
};
