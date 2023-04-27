import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const CardIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M1.875 1.875C0.909766 1.875 0.125 2.65977 0.125 3.625V4.5H15.875V3.625C15.875 2.65977 15.0902 1.875 14.125 1.875H1.875ZM15.875 7.125H0.125V12.375C0.125 13.3402 0.909766 14.125 1.875 14.125H14.125C15.0902 14.125 15.875 13.3402 15.875 12.375V7.125ZM3.1875 10.625H4.9375C5.17812 10.625 5.375 10.8219 5.375 11.0625C5.375 11.3031 5.17812 11.5 4.9375 11.5H3.1875C2.94688 11.5 2.75 11.3031 2.75 11.0625C2.75 10.8219 2.94688 10.625 3.1875 10.625ZM6.25 11.0625C6.25 10.8219 6.44688 10.625 6.6875 10.625H10.1875C10.4281 10.625 10.625 10.8219 10.625 11.0625C10.625 11.3031 10.4281 11.5 10.1875 11.5H6.6875C6.44688 11.5 6.25 11.3031 6.25 11.0625Z" />
    </svg>
  );
};